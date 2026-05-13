import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.*,
        GROUP_CONCAT(DISTINCT c.slug) as category_slugs,
        GROUP_CONCAT(DISTINCT c.id) as category_ids
      FROM projects p
      LEFT JOIN project_categories pc ON p.id = pc.project_id
      LEFT JOIN categories c ON pc.category_id = c.id
      GROUP BY p.id
      ORDER BY p.id DESC
    `);
    
    const projects = (rows as any[]).map(project => ({
      ...project,
      category_slugs: project.category_slugs ? project.category_slugs.split(',') : [],
      category_ids: project.category_ids ? project.category_ids.split(',').map(Number) : [],
      pages: project.pages ? (typeof project.pages === 'string' ? JSON.parse(project.pages) : project.pages) : []
    }));
    
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image_url, technology, site_url, github_url, desktop_screenshot, mobile_screenshot, pages, category_ids } = body;
    
    if (!title) {
      return NextResponse.json({ error: 'عنوان پروژه الزامی است' }, { status: 400 });
    }
    
    const [result]: any = await pool.query(
      `INSERT INTO projects 
       (title, description, image_url, technology, site_url, github_url, desktop_screenshot, mobile_screenshot, pages) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description || '', image_url || '', technology || '', site_url || '', github_url || '', desktop_screenshot || '', mobile_screenshot || '', pages || '[]']
    );

    if (category_ids && category_ids.length > 0) {
      for (const catId of category_ids) {
        await pool.query(
          'INSERT INTO project_categories (project_id, category_id) VALUES (?, ?)',
          [result.insertId, catId]
        );
      }
    }
    
    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد پروژه' }, { status: 500 });
  }
}