import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserModel"; // Assuming you're using a User model
import connectToDb from "@/lib/connectToDb";

export const GET = async (request: NextRequest) => {
  connectToDb();

  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = (decodedToken as { id: string }).id;

    // Find the user in the database
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
