"use server";
import type { AllFilesResponse } from "@/types/types";
import Image from "next/image";

const getFiles = async () => {
  const files = await fetch("http://localhost:3000/api/files", {});
  return await files.json();
};

export default async function FilesList() {
  const files: AllFilesResponse = await getFiles();
  const filesUrls = files.urls;
  return (
    <div>
      {filesUrls.map((url) => (
        <Image
          key={url.fileName}
          src={url.url}
          width={200}
          height={200}
          alt={url.fileName}
        />
      ))}
    </div>
  );
}
