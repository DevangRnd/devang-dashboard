import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { message: "No User Id Provided" },
      { status: 400 },
    );
  }

  try {
    const userToBeDeleted = await User.findByIdAndDelete(userId);

    if (!userToBeDeleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User Deleted Successfully", user: userToBeDeleted },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error deleting user:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Failed to delete user" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}
