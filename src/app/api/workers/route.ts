import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const city = searchParams.get('city');
    const availabilityType = searchParams.get('availabilityType');
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const ratingMin = searchParams.get('ratingMin') ? parseInt(searchParams.get('ratingMin')!) : 0;
    const salaryMin = searchParams.get('salaryMin') ? parseInt(searchParams.get('salaryMin')!) : 0;
    const salaryMax = searchParams.get('salaryMax') ? parseInt(searchParams.get('salaryMax')!) : 999999;
    const sortBy = searchParams.get('sortBy') || 'rating';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const where: Record<string, unknown> = { isAvailable: true };

    if (role && role !== 'all') {
      where.role = role;
    }
    if (city && city !== 'all') {
      where.city = city;
    }
    if (availabilityType && availabilityType !== 'all') {
      where.availabilityType = availabilityType;
    }
    if (verifiedOnly) {
      where.aadhaarVerified = true;
      where.policeVerified = true;
    }
    if (ratingMin > 0) {
      where.rating = { gte: ratingMin };
    }
    if (salaryMin > 0 || salaryMax < 999999) {
      const salaryFilter: Record<string, unknown> = {};
      if (salaryMin > 0) salaryFilter.gte = salaryMin;
      if (salaryMax < 999999) salaryFilter.lte = salaryMax;
      where.salaryExpectation = salaryFilter;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { locality: { contains: search } },
        { skills: { contains: search } },
        { about: { contains: search } },
      ];
    }

    const orderBy: Record<string, string> = {};
    if (sortBy === 'rating') orderBy.rating = 'desc';
    else if (sortBy === 'experience') orderBy.experienceYears = 'desc';
    else if (sortBy === 'salary-low') orderBy.salaryExpectation = 'asc';
    else if (sortBy === 'salary-high') orderBy.salaryExpectation = 'desc';
    else if (sortBy === 'newest') orderBy.createdAt = 'desc';
    else orderBy.rating = 'desc';

    const [workers, total] = await Promise.all([
      db.worker.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          reviews: {
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      db.worker.count({ where }),
    ]);

    return NextResponse.json({
      workers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching workers:', error);
    return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const worker = await db.worker.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        age: body.age,
        gender: body.gender || 'female',
        role: body.role,
        roles: JSON.stringify(body.roles || [body.role]),
        city: body.city,
        locality: body.locality,
        pincode: body.pincode,
        experienceYears: body.experienceYears || 0,
        salaryExpectation: body.salaryExpectation,
        availabilityType: body.availabilityType || 'full-time',
        languages: JSON.stringify(body.languages || []),
        skills: JSON.stringify(body.skills || []),
        about: body.about,
      },
    });
    return NextResponse.json(worker, { status: 201 });
  } catch (error) {
    console.error('Error creating worker:', error);
    return NextResponse.json({ error: 'Failed to create worker' }, { status: 500 });
  }
}