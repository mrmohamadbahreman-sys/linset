import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, topic } = body;
    
    if (!name || !phone || !topic) {
      return NextResponse.json({ error: 'تمامی فیلدها الزامی است' }, { status: 400 });
    }
    
    const [result]: any = await pool.query(
      'INSERT INTO consultations (name, phone, topic) VALUES (?, ?, ?)',
      [name, phone, topic]
    );
    
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ثبت درخواست' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    
    let query = 'SELECT * FROM consultations ORDER BY created_at DESC';
    const params: any[] = [];
    
    if (status !== 'all') {
      query = 'SELECT * FROM consultations WHERE status = ? ORDER BY created_at DESC';
      params.push(status);
    }
    
    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}