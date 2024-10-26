import { generateToken } from "@/lib/generateToken";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/lib/connectToDb";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "All Fields Are Required" },
      { status: 404 },
    );
  }

  try {
    await connectToDb();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email or Password is invalid" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email or Password is invalid" },
        { status: 401 },
      );
    }

    const token = generateToken(user._id.toString(), user.email);
    const userObj = user.toObject();
    delete userObj.password;

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userObj,
        success: true,
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    // Simple error handling since Axios errors are handled in frontend
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
};
