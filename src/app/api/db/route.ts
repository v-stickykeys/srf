import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  console.log("post request");
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const Key = `videos/${getImageFileName(file.name)}`;
  const Body = await file.arrayBuffer();
  const command = new PutObjectCommand({
    Bucket: "srf-polkadot",
    ACL: "public-read",
    Key,
    Body: Buffer.from(Body)
  });

  try {
    await client.send(command);
    const url = `https://srf-polkadot.s3.us-east-2.amazonaws.com/${Key}`;
    return Response.json({ secure_url: url, public_id: Key }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
}

function getImageFileName(name: any): string {
  let imageFileName = name.split(".");
  const ext = imageFileName.pop();
  const nameOnly = imageFileName.join(".");
  return `${nameOnly}.${ext}`;
}
