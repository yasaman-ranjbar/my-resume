import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

function getString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return value instanceof File ? null : (value as string | null);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = getString(formData, "title");
    const slug = getString(formData, "slug");
    const content = getString(formData, "content");
    const status = getString(formData, "status");
    const tagsRaw = getString(formData, "tags");
    const category_id = getString(formData, "category_id");
    const coverFile = formData.get("cover_url");

    let cover_url: string | null = null;
    if (coverFile instanceof File && coverFile.size > 0) {
      const bytes = await coverFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const safeName = `${Date.now()}-${coverFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      await writeFile(filePath, buffer);
      cover_url = `/uploads/${safeName}`;
    }

    const tags: string[] = tagsRaw
      ? (() => {
          try {
            return JSON.parse(tagsRaw) as string[];
          } catch {
            return [];
          }
        })()
      : [];

    if (!title || !slug || !content || !status || !category_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        status,
        tags,
        category_id: parseInt(category_id, 10),
        cover_url,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
      if (error.code === "P2003") {
        return NextResponse.json(
          {
            error: "Invalid category_id: Category does not exist",
          },
          { status: 400 }
        );
      }
    }
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
