import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const projects = await prisma.projects.findMany();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, description, shortDescription, liveUrl, githubUrl, tags, thumbnail } = body;

        const project = await prisma.projects.create({
            data: {
                title,
                slug,
                description,
                shortDescription,
                liveUrl,
                githubUrl,
                tags,
                thumbnail,
            }
        })
        return NextResponse.json(project, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 });
            }
        }
        console.error(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}