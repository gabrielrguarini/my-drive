"use client";
import PdfIcon2 from "./drop-zone/pdf-icon2";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { Url as UrlType } from "@/types/types";
import { revalidatePath, revalidateTag } from "next/cache";

const handleDelete = async (filename: string) => {
  console.log(filename);
  const deleteFile = await fetch(
    `http://localhost:3000/api/delete/${filename}`,
    {
      method: "DELETE",
      next: { revalidate: 60, tags: ["files"] },
    }
  );
  console.log(deleteFile);
  return deleteFile;
};

export default function FileItem({ url }: { url: UrlType }) {
  return (
    <a href={url.url} key={url.fileName}>
      {url.fileName.endsWith("pdf") ? (
        <div>
          <PdfIcon2 />
          <p>{url.fileName}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center relative  w-[100px] h-[100px] border-4 border-white rounded-md">
          <Image
            key={url.fileName}
            src={url.url}
            fill
            style={{ objectFit: "cover" }}
            alt={url.fileName}
          />
          <div className="absolute text-transparent hover:bg-red-500/70 hover:text-black w-full h-full transition-all duration-300">
            <button
              onClick={() => handleDelete(url.fileName)}
              className="w-full h-full flex justify-center items-center"
            >
              <Trash2Icon size={40} />
            </button>
          </div>
        </div>
      )}
    </a>
  );
}
