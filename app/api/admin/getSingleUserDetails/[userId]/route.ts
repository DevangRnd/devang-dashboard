import connectToDb from "@/lib/connectToDb";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  await connectToDb();

  const { userId } = params; // Get userId from URL parameters

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Failed to fetch user", success: false },
      { status: 500 }
    );
  }
};
