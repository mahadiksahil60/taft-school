import { NextResponse } from "next/server";
import multer from "multer";
import cloudinary from "@/app/utils/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type");

    if (!file) {
      return NextResponse.json(
        { message: "select a file to upload" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          public_id: `uploads/${type}`,
        },

        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(fileBuffer);
    });
    console.log(result.public_id, "this is the public id for fetching");
    return NextResponse.json({ url: result.public_id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
