import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("id, title, slug, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get form fields
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;
    const tagsString = formData.get("tags") as string;
    const coverImage = formData.get("coverImage") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 }
      );
    }

    // Parse tags from JSON string
    let tags: string[] = [];
    if (tagsString) {
      try {
        tags = JSON.parse(tagsString);
      } catch {
        // If not JSON, try as comma-separated string
        tags = tagsString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    // Handle cover image upload
    let coverUrl: string | null = null;
    if (coverImage && coverImage.size > 0) {
      try {
        // Validate file type
        if (!coverImage.type.startsWith("image/")) {
          return NextResponse.json(
            { error: "Cover image must be an image file" },
            { status: 400 }
          );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (coverImage.size > maxSize) {
          return NextResponse.json(
            { error: "Cover image size must be less than 5MB" },
            { status: 400 }
          );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExt = coverImage.name.split(".").pop();
        const fileName = `cover-${timestamp}-${randomString}.${fileExt}`;

        // Convert file to buffer
        const arrayBuffer = await coverImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const bucketName = "posts";
        const { data: uploadData, error: uploadError } =
          await supabaseAdmin.storage
            .from(bucketName)
            .upload(fileName, buffer, {
              contentType: coverImage.type,
              upsert: false,
            });

        if (uploadError) {
          console.error("Supabase storage upload error:", uploadError);
          // Fallback: use base64 data URL if storage fails
          const base64 = buffer.toString("base64");
          coverUrl = `data:${coverImage.type};base64,${base64}`;
        } else {
          // Get public URL
          const {
            data: { publicUrl },
          } = supabaseAdmin.storage.from(bucketName).getPublicUrl(fileName);
          coverUrl = publicUrl;
        }
      } catch (uploadErr) {
        console.error("Error uploading cover image:", uploadErr);
        // Continue without cover image if upload fails
      }
    }

    // basic slug sanitize
    const makeSlug = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\- ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/\-+/g, "-")
        .slice(0, 200);

    const finalSlug = slug ? makeSlug(slug) : makeSlug(title);

    // Prepare insert data
    const insertData: any = {
      title,
      slug: finalSlug,
      content,
      status: status || "draft",
    };

    // Add tags if provided
    if (tags && tags.length > 0) {
      insertData.tags = tags;
    }

    // Add cover_url if provided
    if (coverUrl) {
      insertData.cover_url = coverUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("posts")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err: any) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
