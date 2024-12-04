import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session");

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const { value: token } = session;

    const decoded = jwtDecode(token) as {
        exp: number;
    };

    const expiredToken = decoded.exp < Date.now();

    if (expiredToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/update-password", "/welcome", "/welcome/success"],
};
