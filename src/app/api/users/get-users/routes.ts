// app/api/users/list/route.ts
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
          const client = await clerkClient();

    const users = await client.users.getUserList(); 
    console.log(" users:", users);
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error: err.errors || err.message || err,
      },
      { status: 500 }
    );
  }
}
