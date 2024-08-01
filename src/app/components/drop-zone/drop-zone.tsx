"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Trash2Icon, TrashIcon } from "lucide-react";
import ListFilesUpload from "./list-files-upload";

export default function DropZone() {
  const [files, setFiles] = React.useState<File[]>([]);
  const onDrop = useCallback((files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg"], "application/pdf": [".pdf"] },
  });

  return (
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

      <ListFilesUpload files={files} setFiles={setFiles} />
    </div>
  );
}
