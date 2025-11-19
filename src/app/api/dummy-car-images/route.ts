import { NextRequest, NextResponse } from "next/server";
import { getDummyCarImages } from "@/lib/dummyCarImages";

export async function GET(request: NextRequest) {
  const make = request.nextUrl.searchParams.get("make") ?? "car";
  const model = request.nextUrl.searchParams.get("model") ?? "model";
  const count = Number(request.nextUrl.searchParams.get("count")) || 3;

  const data = getDummyCarImages(make, model, Math.min(Math.max(count, 1), 10));
  return NextResponse.json({ data });
}
