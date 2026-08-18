import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET ALL USERS FROM NEON POSTGRESQL DB
export async function GET() {
  try {
    const res = await query('SELECT id, name, email, role, photo_url as "photoUrl", college, location, status, created_at FROM users ORDER BY created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error: any) {
    console.error('Database GET /api/users error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// INSERT NEW USER DIRECTLY INTO NEON POSTGRESQL DB
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, college, location } = body;

    const insertQuery = `
      INSERT INTO users (name, email, password_hash, role, photo_url, college, location, status)
      VALUES ($1, $2, '$2a$10$e7xV6.bSg/yP/hXWq0Vw5e7yX.J3p9M5b7V', 'USER', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', $3, $4, 'ACTIVE')
      RETURNING id, name, email, role, photo_url as "photoUrl", college, location, status, created_at;
    `;

    const res = await query(insertQuery, [
      name || 'New Member',
      email,
      college || 'COEP Tech University',
      location || 'Wakad, Pune',
    ]);

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    console.error('Database POST /api/users error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE USER STATUS OR DELETE USER
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    const res = await query(
      'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await query('DELETE FROM users WHERE id = $1', [id]);
    return NextResponse.json({ message: 'User deleted from Neon DB successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
