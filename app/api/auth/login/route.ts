import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or password is invalid" },
        { status: 401 } // Unauthorized
      );
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email or password is invalid" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!, // Ensure this is stored securely in .env.local
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Set the JWT token in a cookie (HTTP-only, Secure)
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, email: user.email },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Prevent access from JavaScript (XSS protection)
      secure: process.env.NODE_ENV === "production", // Only secure in production
      maxAge: 60 * 60, // 1 hour expiration
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
