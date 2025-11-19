import { NextRequest, NextResponse } from "next/server";
import { CarsController } from "@/modules/cars/CarsController";
import { requireAdmin } from "@/lib/auth";

const controller = new CarsController();

export async function GET(request: NextRequest) {
  try {
    const data = await controller.list(Object.fromEntries(request.nextUrl.searchParams));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
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

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const data = await controller.remove(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
