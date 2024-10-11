import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { hashPassword } from "@/lib/hashPassword";
import User from "@/models/UserModel";
import connectToDb from "@/lib/connectToDb";
// import { generateToken } from "@/lib/generateToken";

export const POST = async (request: NextRequest) => {
  connectToDb();
  try {
    const { name, email, password, role } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already in use" },
        { status: 400 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    // const token = generateToken(newUser._id.toString(), newUser.email);
    const response = NextResponse.json(
      { user: newUser, success: true },
      { status: 201 }
    );
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: true,
    //   maxAge: 60 * 60 * 24,
    //   path: "/",
    // });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
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
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
};
