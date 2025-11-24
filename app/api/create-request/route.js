import prisma from "@/app/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req) {
    const {
        student_name,
        student_email,
        name_of_event,
        date_of_event,
        time_of_event,
        location_of_event,
        date,
    } = await req.json();


    try {
        const dateObj = new Date(date);
        const timeObj = new Date(time_of_event);

        const eventDateTime = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            timeObj.getHours(),
            timeObj.getMinutes(),
            timeObj.getSeconds()
        );

        const request = await prisma.requests.create({
            data: {
                student_name,
                student_email,
                name_of_event,
                date_of_event,
                time_of_event,
                location_of_event,
                eventDateTime,
                date,
            },
        });


        return NextResponse.json(
            {message: "Request created successfully", request},
            {status: 200}
        );
    } catch (error) {
        console.log(error.message, "error")
        return NextResponse.json(
            {message: "Error while creating request", error: error.message},
            {status: 500}
        );
    }
}
