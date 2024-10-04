import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //* Get the authentication status from cookies
  const isAuthenticated = request.cookies.has("authToken");
  const { pathname } = request.nextUrl;

  const isPublicRoute = ["/login", "/signup"].includes(pathname);

  if (isAuthenticated && isPublicRoute) {
    //* Redirect authenticated users trying to access public routes to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    //* Redirect unauthenticated users trying to access private routes to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
