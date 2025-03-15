import prisma from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, email, name, password } = await req.json();

    // Check if the invite exists and is valid
    const invite = await prisma.invite.findUnique({
      where: { token },
    });

    if (!invite || invite.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create interpreter account
    await prisma.interpreter.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Delete the used invite
    await prisma.invite.delete({ where: { token } });

    return NextResponse.json(
      { message: "Interpreter registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
