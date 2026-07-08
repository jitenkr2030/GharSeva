import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get('workerId');
    const employerId = searchParams.get('employerId');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (workerId) where.workerId = workerId;
    if (employerId) where.employerId = employerId;
    if (status && status !== 'all') where.status = status;

    const bookings = await db.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        worker: { select: { name: true, role: true, phone: true, profileImage: true } },
        employer: { select: { name: true, city: true, phone: true } },
      },
      take: 50,
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booking = await db.booking.create({
      data: {
        workerId: body.workerId,
        employerId: body.employerId,
        status: body.status || 'pending',
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        salary: body.salary,
        notes: body.notes,
      },
      include: {
        worker: { select: { name: true, role: true } },
        employer: { select: { name: true, city: true } },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}