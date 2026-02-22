import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function getUserById(userId: string | number) {
    const id = typeof userId === "string" ? Number(userId) : userId;
    return prisma.user.findUnique({
      where: { id },
    });
  }

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const user = await getUserById(id);
  return NextResponse.json({ user });
}