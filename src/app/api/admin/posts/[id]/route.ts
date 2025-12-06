import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Supabase GET by id error:", error);
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ post: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const contentType = req.headers.get("content-type");
    let title: string;
    let slug: string;
    let content: string;
    let status: string;
    let tagsString: string | null = null;
    let categoryId: string | null = null;
    let coverImage: File | null = null;

    if (contentType?.includes("multipart/form-data")) {
      // Handle FormData
      const formData = await req.formData();
      title = formData.get("title") as string;
      slug = formData.get("slug") as string;
      content = formData.get("content") as string;
      status = formData.get("status") as string;
      tagsString = formData.get("tags") as string | null;
      categoryId = formData.get("category_id") as string | null;
      coverImage = formData.get("cover_url") as File | null;
    } else {
      // Handle JSON (backward compatibility)
      const body = await req.json();
      title = body.title;
      slug = body.slug;
      content = body.content;
      status = body.status;
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 }
      );
    }

    // Parse tags from JSON string
    let tags: string[] | undefined = undefined;
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
    let coverUrl: string | undefined = undefined;
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

    // Prepare update data
    const updateData: any = {
      title,
      slug: finalSlug,
      content,
      status: status || "draft",
    };

    // Add category_id if provided
    if (categoryId) {
      updateData.category_id = categoryId;
    }

    // Add tags if provided
    if (tags && tags.length > 0) {
      updateData.tags = tags;
    }

    // Add cover_url if provided
    if (coverUrl) {
      updateData.cover_url = coverUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase PUT error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (err: any) {
    console.error("PUT error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
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
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Supabase DELETE error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
