import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";
import {jwtVerify} from "jose";
import {serialize} from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const token = req.cookies.get("interpreter_auth_token")?.value;
        const secret = new TextEncoder().encode(JWT_SECRET);
        const {payload} = await jwtVerify(token, secret);

        const cookie = serialize('interpreter_auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // expire instantly
            path: '/',
            sameSite: 'lax',
        });

        const res = NextResponse.json({message: 'Logged out successfully'});
        res.headers.set('Set-Cookie', cookie);
        return res;
    } catch (error) {
        console.error("error message:", error.message);
        return NextResponse.json(
            {error: "Internal Server Error", details: error.message},
            {status: 500}
        );
    }
}
