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

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next");
  const Prefix = `videos/`;
  const command = new ListObjectsV2Command({
    Bucket: "srf-polkadot",
    Prefix,
    ContinuationToken: next || undefined
  });

  try {
    const { Contents, NextContinuationToken } = await client.send(command);
    const resources = Contents?.map((item) => {
      return ({
        key: item.Key,
        url: `https://srf-polkadot.s3.amazonaws.com/${item.Key}`,
        lastModified: item.LastModified
      });
    }) || [];
    const nextToken = NextContinuationToken;
    return Response.json({ resources, next: nextToken }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
