import NextAuth from "next-auth";
import { auth } from "@/auth";

const { auth: middlewareWrapper } = NextAuth({
    ...auth,
    providers: [],
});

export default middlewareWrapper((req) => {
    const session = req.auth;
    const isLoggedIn = !!session;
    
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    const isApiUserRoute = req.nextUrl.pathname.startsWith("/api/user");
    const isApiAdminRoute = req.nextUrl.pathname.startsWith("/api/admin");
    
    const isPublicRoute = 
        req.nextUrl.pathname === "/" || 
        req.nextUrl.pathname.startsWith("/api/receptionist") ||
        req.nextUrl.pathname.startsWith("/book") ||
        req.nextUrl.pathname.startsWith("/about") ||
        req.nextUrl.pathname.startsWith("/services") ||
        req.nextUrl.pathname.startsWith("/pricing") ||
        req.nextUrl.pathname.startsWith("/how-it-works") ||
        req.nextUrl.pathname.startsWith("/contact") ||
        req.nextUrl.pathname.startsWith("/privacy") ||
        req.nextUrl.pathname.startsWith("/terms") ||
        req.nextUrl.pathname.startsWith("/careers") ||
        req.nextUrl.pathname.startsWith("/api/settings");
    
    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if (isApiAuthRoute) return;

    if (isApiUserRoute || isApiAdminRoute) {
        if (!isLoggedIn) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/", req.nextUrl));
        }
        return;
    }

    if (isAdminRoute || isDashboardRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/auth/login", req.nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", req.nextUrl));
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
