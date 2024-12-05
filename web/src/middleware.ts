import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTES = ["/category/new", "/profile/new", "/profile/list"];
const SUDO_ROUTES = ["/company/new"];

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

    if (ADMIN_ROUTES.includes(request.nextUrl.pathname)) {
        const decoded = jwtDecode(token) as {
            level: string;
        };

        if (decoded.level === "USER") {
            return NextResponse.rewrite(new URL("/404", request.url));
        }
    }

    if (SUDO_ROUTES.includes(request.nextUrl.pathname)) {
        const decoded = jwtDecode(token) as {
            level: string;
        };

        if (decoded.level !== "SUDO") {
            return NextResponse.rewrite(new URL("/404", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth/update-password",
        "/category/new",
        "/company/new",
        "/profile",
        "/profile/new",
        "/profile/list",
        "/resources/:path",
        "/resource/new",
        "/welcome",
        "/welcome/success",
    ],
};
