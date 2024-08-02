import { s3Client } from "@/app/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;

  try {
    const deleteComand = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: name,
    });
    const deleteResponse = await s3Client.send(deleteComand);

    revalidatePath("/");
    revalidateTag("files");

    return NextResponse.json({ name, deleteResponse });
  } catch (erro) {
    return NextResponse.json({ error: erro });
  }
}
