import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

function getString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return value instanceof File ? null : (value as string | null);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const tagsRaw = getString(formData, "tags");
    const thumbnail = formData.get("thumbnail");

    let thumbnailUrl = null;
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const safeName = `${Date.now()}-${thumbnail.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, safeName);
      await writeFile(filePath, buffer);
      thumbnailUrl = `/uploads/${safeName}`;
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

    if (!title || !slug || !description || !shortDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
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
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: "A project with this slug already exists",
          },
          { status: 409 }
        );
      }
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
