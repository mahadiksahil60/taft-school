import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { interpreter_id, coordinator_id } = await req.json();
  try {
    const findInterpreter = await prisma.interpreters.findUnique({
      where: { id: interpreter_id },
    });

    if (!findInterpreter) {
      return NextResponse.json(
        { message: "Interpreter to be deleted not found" },
        { status: 409 }
      );
    }

    const deleteInterpreter = await prisma.interpreters.delete({
      where: { id: interpreter_id },
    });

    return NextResponse.json(
      { message: "Interpreter deleted successfully", data: deleteInterpreter },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
