import prisma from "@/app/lib/prisma";
import {hash} from "bcryptjs";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {UserType} from "@prisma/client";

// This API route handles the sign-up process for interpreters
export async function POST(req) {
    try {
        const {
            email,
            username,
            password,
            code,
            receive_mail = false,
        } = await req.json();

        // Check if all required fields are provided
        if (!(email && username && password && code)) {
            return NextResponse.json(
                {error: "All fields are required"},
                {status: 400}
            );
        }

        //check if user already exists
        const existingUser = await prisma.interpreter.findUnique({
            where: {email},
        });

        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 409}
            );
        }

        //Checking if the registration code is valid
        const findCode = await prisma.registrationcode.findFirst({
            where: {
                email,
                profile: UserType.Interpreter
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!findCode || findCode.code !== code) {
            return NextResponse.json(
                {error: "Registration code is not valid"},
                {status: 409}
            );
        }

        const hashedPassword = await hash(password, 10);

        //create interpreter account
        const response = await prisma.interpreter.create({
            data: {
                email,
                name: username,
                password: hashedPassword,
                receiveEmail: receive_mail,
            },
        });

        await prisma.registrationcode.delete({
            where: {code},
        });

        return NextResponse.json(
            {message: "Registered Successfully", data: response},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {error: "Internal Server Error", details: error.message},
            {status: 500}
        );
    }
}
