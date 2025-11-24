import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    try {

        const now = new Date();

        const requests = await prisma.requests.findMany({
            where: {
                status: "PENDING",
                eventDateTime: {
                    gt: now,  // greater than current time means future events
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });


        return NextResponse.json(requests, {status: 200});
    } catch (error) {

        return NextResponse.json(
            {error: "Internal Server Error", details: error.message},
            {status: 500}
        );
    }
}
