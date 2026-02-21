import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // try {
  //   const { data, error } = await supabaseAdmin
  //     .from("categories")
  //     .select("*")
  //     .eq("id", id)
  //     .single();

  //   if (error) {
  //     console.error("Supabase GET by id error:", error);
  //     return NextResponse.json({ error: error.message }, { status: 404 });
  //   }

  //   return NextResponse.json({ category: data });
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ error: "Server error" }, { status: 500 });
  // }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // const { id } = await params;
  // try {
  //   const body = await req.json();
  //   const { name, slug } = body;
  //   if (!name) {
  //     return NextResponse.json({ error: "name is required" }, { status: 400 });
  //   }
  //   // Basic slug sanitize
  //   const makeSlug = (s: string) =>
  //     s
  //       .toString()
  //       .trim()
  //       .toLowerCase()
  //       .replace(/[^a-z0-9\- ]/g, "")
  //       .replace(/\s+/g, "-")
  //       .replace(/\-+/g, "-")
  //       .slice(0, 200);
  //   const finalSlug = slug ? makeSlug(slug) : makeSlug(name);
  //   // Check if slug already exists (excluding current category)
  //   const { data: existingCategory } = await supabaseAdmin
  //     .from("categories")
  //     .select("id")
  //     .eq("slug", finalSlug)
  //     .neq("id", id)
  //     .single();
  //   if (existingCategory) {
  //     return NextResponse.json(
  //       { error: "A category with this slug already exists" },
  //       { status: 400 }
  //     );
  //   }
  //   const { data, error } = await supabaseAdmin
  //     .from("categories")
  //     .update({ name, slug: finalSlug })
  //     .eq("id", id)
  //     .select()
  //     .single();
  //   if (error) {
  //     console.error("Supabase PUT error:", error);
  //     return NextResponse.json({ error: error.message }, { status: 500 });
  //   }
  //   return NextResponse.json({ category: data });
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  // }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // try {
  //   // Check if category is being used by any posts
  //   const { data: postsUsingCategory, error: checkError } = await supabaseAdmin
  //     .from("posts")
  //     .select("id")
  //     .eq("category_id", id)
  //     .limit(1);

  //   if (checkError) {
  //     console.error("Error checking posts:", checkError);
  //     // Continue with deletion even if check fails
  //   }

  //   if (postsUsingCategory && postsUsingCategory.length > 0) {
  //     return NextResponse.json(
  //       {
  //         error:
  //           "Cannot delete category: it is being used by one or more posts",
  //       },
  //       { status: 400 }
  //     );
  //   }

  //   const { error } = await supabaseAdmin
  //     .from("categories")
  //     .delete()
  //     .eq("id", id);

  //   if (error) {
  //     console.error("Supabase DELETE error:", error);
  //     return NextResponse.json({ error: error.message }, { status: 500 });
  //   }

  //   return NextResponse.json({ ok: true }, { status: 200 });
  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ error: "Server error" }, { status: 500 });
  // }
}
