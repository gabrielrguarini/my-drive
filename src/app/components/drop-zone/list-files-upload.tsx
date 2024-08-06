import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import React from "react";
import PdfIcon2 from "./pdf-icon2";

export default function ListFilesUpload({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  return (
    <ul className="flex list-none flex-wrap gap-4">
      {files.map((file, index) => (
        <div key={index} className="h-[140px] w-[100px] overflow-hidden">
          <li className="relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-md border-4 border-white">
            {file.type.includes("image") ? (
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={`${URL.createObjectURL(file)}`}
                alt=""
              />
            ) : (
              <PdfIcon2 />
            )}
            <div className="absolute h-full w-full text-transparent transition-all duration-300 hover:bg-red-500/70 hover:text-black">
              <button
                className="flex h-full w-full items-center justify-center"
                onClick={() => {
                  const newFiles = [...files];
                  newFiles.splice(index, 1);
                  setFiles(newFiles);
                }}
              >
                <Trash2Icon size={40} />
              </button>
            </div>
          </li>
          <p>{file.name}</p>
        </div>
      ))}
    </ul>
  );
}
