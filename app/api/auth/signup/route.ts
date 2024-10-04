import connectToDb from "@/lib/connectToDb";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 400 }
      );
    }
    await connectToDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.NEXT_PUBLIC_JWT_SECRET!,
      { expiresIn: "5h" }
    );
    // Set the JWT token in a cookie
    const response = NextResponse.json(
      {
        message: "Signup successful",
        user: { id: newUser._id, email: newUser.email },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Helps prevent XSS
      secure: process.env.NODE_ENV === "production", // Use secure cookie in production
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Some Error Occurred" }, { status: 500 });
  }
};
