import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('id, title, slug, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase GET error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, content, status } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'title and content are required' }, { status: 400 });
    }

    // basic slug sanitize (optional - do more robust if needed)
    const makeSlug = (s: string) =>
      s.toString().trim().toLowerCase()
        .replace(/[^a-z0-9\- ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\-+/g, '-')
        .slice(0, 200);

    const finalSlug = slug ? makeSlug(slug) : makeSlug(title);

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([{ title, slug: finalSlug, content, status: status || 'draft' }])
      .select()
      .single();

    if (error) {
      console.error('Supabase POST error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
