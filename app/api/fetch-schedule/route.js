import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { publicid } = await req.json();
  try {
  // Construct the Cloudinary URL (you can add transformations like resizing here if needed)
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`;
  
 } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 200 }
    );
  }
}
