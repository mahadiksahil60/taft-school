import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req) {
    const {request_id, interpreter_id} = await req.json();
    try {

        const token = req.cookies.get("interpreter_auth_token")?.value;
        if (!token) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const userId = jwt.verify(token, process.env.JWT_SECRET)?.id;
        if (!userId) return NextResponse.json({error: "User Id not found"}, {status: 401});


        await prisma.$transaction(async (tx) => {
            const requestExists = await tx.requests.findUnique({
                where: {id: request_id},
            });

            if (!requestExists) {
                return NextResponse.json(
                    {message: "Request Not Found"},
                    {status: 409}
                );
            }

            if (requestExists.status !== "PENDING") {
                return NextResponse.json({
                    message: "Request has already been processed",
                });
            }

            return await tx.requests.update({
                where: {id: request_id},
                data: {status: "ACCEPTED", interpreterId: userId, acceptedAt: new Date()},
            });
        });

        return NextResponse.json(
            {message: "Request Accepted Successfully"},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 200}
        );
    }
}
