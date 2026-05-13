import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'projects';
    
    if (!file) {
      return NextResponse.json({ error: 'فایلی یافت نشد' }, { status: 400 });
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'حجم فایل باید کمتر از ۵ مگابایت باشد' }, { status: 400 });
    }
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'فرمت فایل پشتیبانی نمی‌شود' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    const ext = path.extname(file.name);
    const filename = `${timestamp}-${randomStr}${ext}`;
    
    const uploadDir = path.join(process.cwd(), 'public/uploads', folder);
    const filePath = path.join(uploadDir, filename);
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${folder}/${filename}`;
    
    return NextResponse.json({ success: true, url: fileUrl, filename });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در آپلود فایل' }, { status: 500 });
  }
}