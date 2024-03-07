import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const tokenCookie = request.cookies.get("token");

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  switch (request.nextUrl.pathname) {
    case LOGIN_PATH:
      if (userCookie && tokenCookie && userCookie.value && tokenCookie.value) {
        return redirectTo(HOME_PATH);
      }
      break;

    default:
      if (!userCookie || !tokenCookie) {
        return redirectTo(LOGIN_PATH);
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
