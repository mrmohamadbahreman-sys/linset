import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است' },
        { status: 400 }
      );
    }
    
    const hashedPassword = hashPassword(password);
    
    const [rows]: any = await pool.query(
      'SELECT id, username, is_admin, password FROM users WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'نام کاربری یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }
    
    const user = rows[0];
    const isPasswordValid = user.password === hashedPassword || 
      user.password === crypto.createHash('md5').update(password).digest('hex');
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'نام کاربری یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }
    
    const sessionData = JSON.stringify({
      id: user.id,
      username: user.username,
      is_admin: user.is_admin === 1 || user.is_admin === true
    });
    
    const cookieStore = await cookies();
    cookieStore.set('user_session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });
    
    return NextResponse.json({ 
      success: true, 
      is_admin: user.is_admin === 1 || user.is_admin === true 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'خطا در ارتباط با سرور' },
      { status: 500 }
    );
  }
}