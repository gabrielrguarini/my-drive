"use client";
import React, { useCallback } from "react";
import {
  DropEvent,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import ListFilesUpload from "./list-files-upload";

export default function DropZone() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileErrors, setFileErrors] = React.useState<FileError[]>([]);
  const onDrop = useCallback((files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  }, []);
  const onDropRejected = (
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    const errors = fileRejections.map(
      (fileRejection) => fileRejection.errors[0]
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
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="w-full p-24">
      <div className="flex flex-col justify-center gap-4 w-[345px] m-auto text-center">
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-black p-4 cursor-pointer rounded-xl"
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
      </div>
      {fileErrors &&
        fileErrors.map((error, index) => <p key={index}> {error.message} </p>)}
      <ListFilesUpload files={files} setFiles={setFiles} />
    </div>
  );
}
