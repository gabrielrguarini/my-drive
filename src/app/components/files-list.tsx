"use server";
import type { AllFilesResponse } from "@/types/types";
import FileItem from "./file-item";

const getFiles = async () => {
  const files = await fetch("http://localhost:3000/api/files", {
    next: { revalidate: 60, tags: ["files"] },
  });
  if (!files.ok) {
    throw new Error("Failed to fetch data");
  }
  return await files.json();
};

export default async function FilesList() {
  const files: AllFilesResponse = await getFiles();
  console.log(files.status);
  const filesUrls = files.urls;
  return (
    <div className="flex flex-wrap gap-4">
      {filesUrls.map((url) => {
        return <FileItem key={url.fileName} url={url} />;
      })}
    </div>
  );
}
