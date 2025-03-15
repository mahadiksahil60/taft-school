import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { request_id, interpreter_id } = await req.json();
  try {
    const acceptReq = await prisma.$transaction(async (tx) => {
      const requestExists = await tx.requests.findUnique({
        where: { id: request_id },
      });

      if (!requestExists) {
        return NextResponse.json(
          { message: "Request Not Found" },
          { status: 409 }
        );
      }

      if (requestExists.status !== "PENDING") {
        return NextResponse.json({
          message: "Request has already been processed",
        });
      }

      return await tx.requests.update({
        where: { id: request_id },
        data: { status: "ACCEPTED", interpreterId: interpreter_id },
      });
    });

    return NextResponse.json(
      { message: "Request Accepted Succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
