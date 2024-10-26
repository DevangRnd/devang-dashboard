import connectToDb from "@/lib/connectToDb";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToDb();
  try {
    const users = await User.find({}).sort({ name: 1 });
    return NextResponse.json({ users, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", success: false },
      { status: 500 },
    );
  }
};
