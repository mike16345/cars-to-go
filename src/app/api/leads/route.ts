import { NextRequest, NextResponse } from "next/server";
import { LeadsController } from "@/modules/leads/LeadsController";
import { requireAdmin } from "@/lib/auth";

const controller = new LeadsController();

export async function GET() {
  try {
    await requireAdmin();
    const data = await controller.list();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await controller.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const body = await request.json();
    const data = await controller.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
