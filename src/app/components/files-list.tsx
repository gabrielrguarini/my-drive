"use server";
import type { AllFilesResponse } from "@/types/types";
import Image from "next/image";
import PdfIcon2 from "@/app/components/drop-zone/pdf-icon2";

const getFiles = async () => {
  const files = await fetch("http://localhost:3000/api/files", {
    cache: "no-store",
  });
  return await files.json();
};

export default async function FilesList() {
  const files: AllFilesResponse = await getFiles();
  const filesUrls = files.urls;
  return (
    <div>
      {filesUrls.map((url) => {
        return (
          <a href={url.url} key={url.fileName}>
            {url.fileName.endsWith("pdf") ? (
              <PdfIcon2 />
            ) : (
              <Image
                key={url.fileName}
                src={url.url}
                width={200}
                height={200}
                alt={url.fileName}
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
