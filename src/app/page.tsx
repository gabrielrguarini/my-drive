import { Suspense } from "react";
import DropZone from "./components/drop-zone/drop-zone";
import FilesList from "./components/files-list";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <DropZone />
      <FilesList />
    </main>
  );
}
