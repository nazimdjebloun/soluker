import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
            const client = await clerkClient();
    const user = await client.users.createUser({
      emailAddress: ["test000@example.com"], // replace with dynamic email later
      password: "strongPassword123!",
      firstName: "John",
      lastName: "Doe",
      skipPasswordRequirement: true,
      skipPasswordChecks: true,
    });

    return NextResponse.json({ message: "User created", user });
  } catch (err: any) {
    console.error("Clerk error:", err);

    // Handle duplicate email
    let errorMessage = "Failed to create user";
    if (err?.errors?.[0]?.longMessage?.includes("email address already in use")) {
      errorMessage = "This email is already registered.";
    } else if (err?.message) {
      errorMessage = err.message;
    }

    return NextResponse.json({ message: errorMessage, error: err }, { status: 400 });
  }
}