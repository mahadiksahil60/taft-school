import prisma from "@/app/lib/prisma";
import { SendMail } from "@/app/utils/mailer";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { coordinator_id, interpreter_email } = await req.json();
  try {
    if (!interpreter_email) {
      return NextResponse.json(
        { message: "Invalid interpreter mail" },
        { status: 409 }
      );
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?token=${token}`;
    await SendMail({
      to: interpreter_email,
      subject: "Invitation",
      role: "Interpreter",
      link: inviteLink,
    })
      .then(async () => {
        await prisma.invites.create({
          data: {
            email: interpreter_email.toString(),
            token,
            expiresAt,
          },
        });
      })
      .catch((error) => {
        return NextResponse.json(
          { message: "Failed to send mail", error },
          { status: 500 }
        );
      });

    return NextResponse.json("mail sent successfully", { status: 200 });
  } catch (error) {
    console.log(error?.message);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
