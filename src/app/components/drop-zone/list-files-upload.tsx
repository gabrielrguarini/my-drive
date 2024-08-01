import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import React from "react";
import PdfIcon from "./pdf-icon";

export default function ListFilesUpload({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  return (
    <ul className="list-none flex flex-wrap gap-4">
      {files.map((file, index) => (
        <div key={index} className="w-[100px] h-[140px] overflow-hidden">
          <li className="flex flex-col items-center justify-center relative  w-[100px] h-[100px] border-4 border-white rounded-md">
            {file.type.includes("image") ? (
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={`${URL.createObjectURL(file)}`}
                alt=""
              />
            ) : (
              <PdfIcon />
            )}
            <div className="absolute text-transparent hover:bg-red-500/70 hover:text-black w-full h-full transition-all duration-300">
              <button
                className="w-full h-full flex justify-center items-center"
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
