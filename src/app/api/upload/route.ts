import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/s3Client";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files = data.getAll("files") as File[];
  if (files.length === 0) {
    return NextResponse.json(
      { status: "error", message: "No file uploaded" },
      { status: 400 }
    );
  }

  try {
    const uploadResults = files.map(async (file) => {
      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      const name = file.name.replace(/\..*/, "");
      const extension = file.type.replace(/^.*\//, "");
      const uploadParams = {
        Bucket: "my-drive-aplication",
        Key: `${name}-${Date.now()}.${extension}`,
        Body: buffer,
        ContentType: file.type,
      };
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      return { fileName: file.name, status: "uploaded" };
    });
    const results = await Promise.all(uploadResults);
    revalidatePath("/");
    revalidateTag("files");
    return NextResponse.json(
      {
        status: "ok",
        message: "Files uploaded successfully",
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", Error: error },
      { status: 500 }
    );
  }
}
