import prisma from "@/app/lib/prisma";
import {SendMail} from "@/app/utils/mailer";
import {NextResponse} from "next/server";
import {UserType} from "@prisma/client";

const giveProfile = (type) => {
    if (type.toString().trim().toLowerCase() === UserType.Interpreter.toString().trim().toLowerCase()) {
        return UserType.Interpreter;
    } else if (type.toString().trim().toLowerCase() === UserType.Coordinators.toString().trim().toLowerCase()) {
        return UserType.Coordinators;
    } else if (type.toString().trim().toLowerCase() === UserType.Admin.toString().trim().toLowerCase()) {
        return UserType.Admin;
    } else {
        return null
    }
}

export async function POST(req) {
    const {email, type} = await req.json();
    try {
        if (!email) {
            return NextResponse.json(
                {message: "Invalid mail"},
                {status: 409}
            );
        }

        const profile = giveProfile(type);

        if (profile === null) {
            return NextResponse.json({message: "Invalid user type found please contact the dev"})
        }

        const Code = Math.floor(1000 + Math.random() * 9000);
        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}`;
        await SendMail({
            to: email,
            subject: "Invitation",
            role: type,
            link: inviteLink,
            code: Code,
        })
            .then(async () => {
                await prisma.registrationcode.create({
                    data: {
                        email: email,
                        code: Code.toString(),
                        profile
                    },
                });
            })
            .catch((error) => {
                return NextResponse.json(
                    {message: "Failed to send mail", error},
                    {status: 500}
                );
            });

        return NextResponse.json("mail sent successfully", {status: 200});
    } catch (error) {
        console.log(error?.message);
        return NextResponse.json(
            {message: "Internal Server Error", error},
            {status: 500}
        );
    }
}
