import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug } = body;

    // Validate required field
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    // Basic slug sanitize function
    const makeSlug = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\- ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/\-+/g, "-")
        .slice(0, 200);

    const finalSlug = slug ? makeSlug(slug) : makeSlug(name);

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: finalSlug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the category
    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
