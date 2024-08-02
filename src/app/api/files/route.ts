import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/s3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
    });

    const { Contents } = await s3Client.send(listObjectsCommand);

    const filesWithUrls = await Promise.all(
      Contents?.map(async (object) => {
        const fileName = object.Key!;
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return {
          fileName,
          url,
        };
      }) || []
    );

    return NextResponse.json({
      status: "ok",
      urls: filesWithUrls,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 500 }
    );
  }
}
