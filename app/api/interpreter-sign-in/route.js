import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {serialize} from 'cookie';


export async function POST(req, res) {
  try {
    const { email, password, role, remember = false } = await req.json();
    const user = await prisma.interpreter.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User with the following email not found" },
        { status: 409 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }



    const profileData = await prisma.interpreter.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        requests: true,
      },
    });

    const userData = jwt.sign(
        { ...profileData },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    const cookie = serialize('interpreter_auth_token', userData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week of expiry in seconds
      path: '/',
      sameSite: 'lax',
    });

    return new Response(
        JSON.stringify({ message: 'Signed in' }),
        {
          status: 200,
          headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json',
          },
        }
    );
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
