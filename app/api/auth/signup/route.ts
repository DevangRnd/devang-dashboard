import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    // TODO Implement the logic with the database
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return NextResponse.json({ email, hashedPassword }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};
