import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { hashPassword } from "@/lib/hashPassword";
import User from "@/models/UserModel";
import connectToDb from "@/lib/connectToDb";
import { generateToken } from "@/lib/generateToken";
export const POST = async (request: NextRequest) => {
  connectToDb();
  try {
    const { name, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "This email is alerady in use" },
        { status: 404 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser._id.toString(), newUser.email);
    const response = NextResponse.json(
      { newUser, success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Ensure secure flag is set in production
      maxAge: 60 * 60 * 24, // 24 hours expiration (in seconds)
      path: "/", // Path for the cookie
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
        { message: error || "Request failed" },
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
