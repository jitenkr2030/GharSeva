import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const worker = await db.worker.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        attendances: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        salaryRecords: {
          orderBy: { month: 'desc' },
          take: 12,
        },
      },
    });

    if (!worker) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }

    return NextResponse.json(worker);
  } catch (error) {
    console.error('Error fetching worker:', error);
    return NextResponse.json({ error: 'Failed to fetch worker' }, { status: 500 });
  }
}