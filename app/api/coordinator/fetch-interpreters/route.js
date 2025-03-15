import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const interpreterList = await prisma.interpreter.findMany();
    if (!interpreterList) {
      return NextResponse.json(
        { message: "No Interpreter Found" },
        { status: 409 }
      );
    }
    return NextResponse.json(interpreterList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
