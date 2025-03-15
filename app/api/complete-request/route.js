import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { request_id, interpreter_id } = await req.json();
  try {
    const requestToUpdate = await prisma.requests.update({
      where: { id: request_id },
      data: { status: "PENDING", interpreterId: null },
    });
    return NextResponse.json(
      { data: requestToUpdate, message: "request removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
