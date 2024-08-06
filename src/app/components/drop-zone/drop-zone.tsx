"use client";
import React, { useCallback } from "react";
import {
  DropEvent,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import ListFilesUpload from "./list-files-upload";
import { revalidatePath } from "next/cache";

export default function DropZone() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileErrors, setFileErrors] = React.useState<FileError[]>([]);
  const onDrop = useCallback((files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  }, []);
  const onDropRejected = (
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => {
    const errors = fileRejections.map(
      (fileRejection) => fileRejection.errors[0],
    );
    setFileErrors(errors);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg"], "application/pdf": [".pdf"] },
    maxSize: 1024 * 1024 * 3,
    minSize: 1,
    multiple: true,
    onDropRejected,
  });

  const handleSubmit = async (formData: FormData) => {
    files.map((file) => {
      formData.append("files", file);
    });
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      next: { tags: ["files"] },
    });
    if (response.ok) {
      setFiles([]);
      return response;
    }
    return new Error("Failed to upload files");
  };
  return (
    <div className="w-full p-24">
      <form
        action={handleSubmit}
        className="m-auto flex w-[345px] flex-col justify-center gap-4 text-center"
      >
        <div
          {...getRootProps()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-black p-4"
        >
          <label className="cursor-pointer">
            {isDragActive
              ? `Solte o arquivo aqui`
              : "Clique ou arraste um arquivo para enviar"}
          </label>
          <input
            {...getInputProps()}
            id="file-upload"
            className="sr-only"
            type="file"
          ></input>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {fileErrors &&
        fileErrors.map((error, index) => <p key={index}> {error.message} </p>)}
      <ListFilesUpload files={files} setFiles={setFiles} />
    </div>
  );
}
