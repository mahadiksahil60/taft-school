import prisma from "@/app/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const {request_id} = await req.json();
    try {
        const token = req.cookies.get("interpreter_auth_token")?.value
        if (!token) return NextResponse.json({error: "Unauthorized"}, {status: "409"});
        const interpreter = await jwt.verify(token, process.env.JWT_SECRET)?.id

        if (!request_id) {
            return NextResponse.json(
                {message: "Request not found"},
                {status: 400}
            );
        }
        const requestToUpdate = await prisma.requests.update({
            where: {id: request_id, interpreterId: interpreter},
            data: {status: "PENDING", interpreterId: null},
        });
        if (!requestToUpdate) {
            return NextResponse.json(
                {message: "Request to be deleted not found"},
                {status: 409}
            );
        }
        return NextResponse.json(
            {data: requestToUpdate, message: "request removed successfully"},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error", error},
            {status: 200}
        );
    }
}
