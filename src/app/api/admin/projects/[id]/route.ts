import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

function getString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return value instanceof File ? null : (value as string | null);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Project delete error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const title = (formData.get("title") as string) ?? "";
    const slug = (formData.get("slug") as string) ?? "";
    const description = (formData.get("description") as string) ?? "";
    const shortDescription = (formData.get("shortDescription") as string) ?? "";
    const liveUrl = getString(formData, "liveUrl");
    const githubUrl = getString(formData, "githubUrl");
    const tagsRaw = getString(formData, "tags");
    const thumbnailInput = formData.get("thumbnail");

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
    if (thumbnailInput instanceof File && thumbnailInput.size > 0) {
      const bytes = await thumbnailInput.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const safeName = `${Date.now()}-${thumbnailInput.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      await writeFile(filePath, buffer);
      thumbnailUrl = `/uploads/${safeName}`;
    } else if (typeof thumbnailInput === "string" && thumbnailInput) {
      thumbnailUrl = thumbnailInput;
    }

    await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        description,
        shortDescription,
        liveUrl,
        githubUrl,
        tags,
        thumbnail: thumbnailUrl,
      },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
