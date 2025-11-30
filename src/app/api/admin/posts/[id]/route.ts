import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { data, error } = await supabaseAdmin.from('posts').select('*').eq('id', id).single();
    if (error) {
      console.error('Supabase GET by id error:', error);
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ post: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, slug, content, status } = body;
    if (!title || !content) return NextResponse.json({ error: 'title and content required' }, { status: 400 });

    const makeSlug = (s: string) =>
      s.toString().trim().toLowerCase()
        .replace(/[^a-z0-9\- ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\-+/g, '-')
        .slice(0, 200);

    const finalSlug = slug ? makeSlug(slug) : makeSlug(title);

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update({ title, slug: finalSlug, content, status: status || 'draft' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase PUT error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { error } = await supabaseAdmin.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Supabase DELETE error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
