import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, slug } = body;

    // Basic type & presence validation
    if (
      typeof name !== "string" ||
      typeof slug !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Name and slug must be provided as strings",
        },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const processedSlug = slug.toLowerCase().trim();

    if (trimmedName.length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (processedSlug.length === 0) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Enforce slug format: only lowercase letters, numbers, and hyphens
    if (!/^[a-z0-9-]+$/.test(processedSlug)) {
      return NextResponse.json(
        {
          error:
            "Invalid slug format. Use only lowercase letters, numbers, and hyphens (no spaces or special characters).",
        },
        { status: 400 }
      );
    }

    // Create the category
    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        slug: processedSlug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof
        Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "A category with this slug already exists",
        },
        { status: 409 }
      );
    }

    // Log unexpected errors for debugging
    console.error("Error creating category:", error);

    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
