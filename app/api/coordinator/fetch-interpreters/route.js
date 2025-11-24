import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        const token = await req.cookies.get("coordinator_auth_token");

        if (!token) {
            return NextResponse.json({status: 409, message: "Unauthorized access denied"});
        }

        const interpreterList = await prisma.interpreter.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });

        if (!interpreterList) {
            return NextResponse.json(
                {message: "No Interpreter Found", status: 409},
            );
        }

        const interpreters = interpreterList.map((interpreter) => {
            return {
                name: interpreter.name,
                email: interpreter.email,
            }
        })

        return NextResponse.json(interpreters || []);
    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error", status: 500}
        );
    }
}
