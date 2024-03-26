import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { checkPermission } from "./lib/permissions";
import { Permissions } from "./types/LoginResponse";
import next from "next";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";
const UNAUTHORIZED = "/unauthorized";

export async function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const tokenCookie = request.cookies.get("token");
  const permissionsCookie = request.cookies.get("permissions");
  const permissions: string[] = permissionsCookie ? JSON.parse(permissionsCookie.value) : [];

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  const nextPath = request.nextUrl.pathname;

  switch (nextPath) {
    case LOGIN_PATH:
      if (userCookie && tokenCookie && userCookie.value && tokenCookie.value) {
        return redirectTo(HOME_PATH);
      }
      break;

    default:
      if (!userCookie || !tokenCookie) {
        return redirectTo(LOGIN_PATH);
      }

      if (!(nextPath === "/" || nextPath === "/dashboard" || nextPath === "/unauthorized" || nextPath === "/settings")) {
        console.log("checkking");
        let myPermission = permissions.find((p) => p === nextPath);
        // if (!myPermission) return redirectTo(UNAUTHORIZED);
      }
  }

  return NextResponse.next();
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
