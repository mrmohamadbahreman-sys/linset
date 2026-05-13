import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY id');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug } = body;
    
    if (!name || !slug) {
      return NextResponse.json({ error: 'نام و اسلاگ الزامی است' }, { status: 400 });
    }
    
    const [existing]: any = await pool.query('SELECT id FROM categories WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return NextResponse.json({ error: 'این اسلاگ قبلاً وجود دارد' }, { status: 409 });
    }
    
    const [result]: any = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد دسته‌بندی' }, { status: 500 });
  }
}