import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;
    const tags = formData.get("tags") as string;
    const category_id = formData.get(
      "category_id"
    ) as string;
    const cover_url = formData.get("cover_url") as
      | string
      | null;
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        slug,
        content,
        status,
        tags: JSON.parse(tags),
        category_id: parseInt(category_id, 10),
        cover_url: cover_url || null,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
