import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
    const interpreterToken = req.cookies.get("interpreter_auth_token")?.value;
    const coordinatorToken = req.cookies.get("coordinator_auth_token")?.value;
    const pathname = req.nextUrl.pathname;


    // ===== Interpreter Login Logic =====
    if (
        pathname.startsWith("/interpreter-sign-in") ||
        pathname.startsWith("/interpreter-sign-up")
    ) {

        if (interpreterToken) {
            return NextResponse.redirect(new URL("/interpreter", req.url));
        } else {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next(); // Allow access to auth pages if not logged in
    }

    // ===== Coordinator Logic =====
    if (
        pathname.startsWith("/coordinator-sign-in") ||
        pathname.startsWith("/coordinator-sign-up")
        // pathname.startsWith("/coordinator")
    ) {
        if (coordinatorToken) {
            return NextResponse.redirect(new URL("/coordinator", req.url));
        } else {
            // return NextResponse.redirect(new URL("/"))
        }
        return NextResponse.next();
    }

    return NextResponse.next(); // Default behavior
}

export const config = {
    matcher: [
        "/interpreter-sign-in",
        "/interpreter-sign-up",
        "/coordinator-sign-in",
        "/coordinator-sign-up",
        "/coordinator"
    ],
};
