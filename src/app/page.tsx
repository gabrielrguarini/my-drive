import DropZone from "./components/drop-zone/drop-zone";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <DropZone />
      </div>
    </main>
  );
}
