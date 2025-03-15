import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { request_id, interpreter_id } = await req.json();
  try {
    if (!request_id && !interpreter_id) {
      return NextResponse.json(
        { message: "Missing keys in the object" },
        { status: 400 }
      );
    }
    const requestToUpdate = await prisma.requests.update({
      where: { id: request_id, interpreterId: interpreter_id },
      data: { status: "PENDING", interpreterId: null },
    });
    if (!requestToUpdate) {
      return NextResponse.json(
        { message: "Request to be deleted not found" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { data: requestToUpdate, message: "request removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 200 }
    );
  }
}
