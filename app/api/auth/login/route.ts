import { generateToken } from "@/lib/generateToken";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs"; // To compare the hashed password
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or Password is invalid" },
        { status: 401 }
      );
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email or Password is invalid" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = generateToken(user._id.toString(), user.email);

    // Set the JWT token in a cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, email: user.email },
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Secure, not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Only secure in production
      maxAge: 60 * 60 * 24, // 24 hours expiration
      path: "/", // Cookie path
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
