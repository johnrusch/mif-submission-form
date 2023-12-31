import type { APIRoute } from "astro";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const key = data.get("key");
  if (key !== process.env.SUBMISSION_KEY) {
    console.log("DENIED: Invalid Key");
    return new Response(
      JSON.stringify({
        message: "Incorrect Submission Key",
      }),
      { status: 419 }
    );
  }
  const title = data.get("title");
  const artist = data.get("artist");
  const description = data.get("description") ?? "";
  const upload = data.get("upload") as File;
  const arrayBuffer = await upload.arrayBuffer();
  // Validate the data - you'll probably want to do more than this
  if (!title || !artist || !upload) {
    console.log("where is it?");
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log("AWS credentials not configured in environment variables");
    return new Response(
      JSON.stringify({
        message: "uh oh, missing credentials",
      }),
      { status: 400 }
    );
  }
  const s3Config = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: "us-west-2",
  };
  const client = new S3Client(s3Config);
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${process.env.FOLDER}/${title}-${artist}.${
      upload.type.split("/")[1]
    }`,
    Body: arrayBuffer,
    ContentType: upload.type,
    Metadata: {
      description: description.toString(),
    },
  });

  try {
    const response = await client.send(command);
    console.log("response", response);
    // return redirect("/submission/confirmation");
    return new Response(
      JSON.stringify({
        message: "Yayy!!!",
        status: 200,
        song: {
          title,
          artist
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("error: ", error);
    return new Response(
      JSON.stringify({
        message: "oh booo! unable to upload track",
      }),
      { status: 400 }
    );
  }
};
