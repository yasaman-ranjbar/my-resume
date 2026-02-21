import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const title = (formData.get("title") as string) ?? "";
    const slug = (formData.get("slug") as string) ?? "";
    const content = (formData.get("content") as string) ?? "";
    const status = (formData.get("status") as string) ?? "";
    const category_id = (formData.get("category_id") as string) ?? "";
    const cover_url = formData.get("cover_url"); // string | File | null
    const tagsRaw = (formData.get("tags") as string) ?? "";

    const tags: string[] = tagsRaw
      ? (() => {
          try {
            return JSON.parse(tagsRaw) as string[];
          } catch {
            return [];
          }
        })()
      : [];

    let thumbnailUrl: string | null = null;
    if (cover_url instanceof File && cover_url.size > 0) {
      const bytes = await cover_url.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const safeName = `${Date.now()}-${cover_url.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      await writeFile(filePath, buffer);
      thumbnailUrl = `/uploads/${safeName}`;
    } else if (typeof cover_url === "string" && cover_url) {
      thumbnailUrl = cover_url;
    }

    await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        content,
        status,
        category_id: parseInt(category_id, 10),
        tags,
        cover_url: thumbnailUrl,
      },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
