import { NextResponse } from "next/server";
import { AxiosError } from "axios";
export const POST = async () => {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // This immediately expires the cookie
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle Axios-specific errors
      return NextResponse.json(
        { message: error.response?.data?.message || "Request failed" },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Request failed" },
        { status: 500 }
      );
    } else {
      // Handle unexpected error types
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
};
