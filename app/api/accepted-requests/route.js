import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {

    const {past_assignment} = await req.json();
    try {
        const idfromToken = req.cookies.get("interpreter_auth_token")?.value;
        const id = await jwt.verify(idfromToken, process.env.JWT_SECRET)?.id

        const interpreter = id

        if (!interpreter) return NextResponse.json({error: "Interpreter not found"}, {status: 409})

        let requests

        if (past_assignment) {
            // fetch current interpreter past records.
            requests = await prisma.requests.findMany({
                where: {
                    interpreterId: interpreter, eventDateTime: {
                        lt: new Date()
                    }
                },
                orderBy: {
                    acceptedAt: "desc"
                }
            });
        } else {
            requests = await prisma.requests.findMany({
                where: {interpreterId: interpreter},
                orderBy: {
                    acceptedAt: "desc"
                }
            });
        }

        return NextResponse.json(
            requests,
            {status: 200}
        );
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {error: "Internal Server Error", details: error.message},
            {status: 500}
        );
    }
}
