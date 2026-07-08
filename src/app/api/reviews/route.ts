import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get('workerId');

    const where: Record<string, unknown> = {};
    if (workerId) where.workerId = workerId;

    const reviews = await db.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        worker: { select: { name: true, role: true, profileImage: true } },
      },
      take: 50,
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const review = await db.review.create({
      data: {
        workerId: body.workerId,
        employerId: body.employerId,
        rating: body.rating,
        comment: body.comment,
      },
    });

    // Update worker average rating
    const allReviews = await db.review.findMany({
      where: { workerId: body.workerId },
    });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await db.worker.update({
      where: { id: body.workerId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}