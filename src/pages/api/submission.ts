import type { APIRoute } from "astro";
import * as AWS from 'aws-sdk';


export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    console.log("where is it?")
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  console.log("yay!")
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
