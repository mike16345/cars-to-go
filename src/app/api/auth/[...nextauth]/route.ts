import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdmin,
  endSession,
  getCurrentUser,
  startSession,
} from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({
    data: user ? { email: user.email, role: user.role } : null,
  });
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await authenticateAdmin(email, password);

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  startSession(user.id);
  return NextResponse.json({ data: { email: user.email, role: user.role } });
}

export async function DELETE() {
  endSession();
  return NextResponse.json({ message: "Signed out" });
}
