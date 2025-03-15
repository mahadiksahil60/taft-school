import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { interpreter_id } = await req.json();
  try {
    const requests = await prisma.requests.findMany({
      where: { interpreterId: interpreter_id },
    });
    return NextResponse.json(
      requests.length === 0 ? "No Request Found" : requests,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
