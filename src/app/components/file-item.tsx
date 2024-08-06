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
    },
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
        <div className="relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-md border-4 border-white">
          <Image
            key={url.fileName}
            src={url.url}
            fill
            style={{ objectFit: "cover" }}
            alt={url.fileName}
          />
          <div className="absolute h-full w-full text-transparent transition-all duration-300 hover:bg-red-500/70 hover:text-black">
            <button
              onClick={() => handleDelete(url.fileName)}
              className="flex h-full w-full items-center justify-center"
            >
              <Trash2Icon size={40} />
            </button>
          </div>
        </div>
      )}
    </a>
  );
}
