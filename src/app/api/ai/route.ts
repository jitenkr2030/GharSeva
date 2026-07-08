import { NextResponse } from 'next/server';

// AI-powered salary estimator based on city, role, and experience
const SALARY_DATA: Record<string, Record<string, { min: number; max: number }>> = {
  Mumbai: {
    housemaid: { min: 8000, max: 15000 },
    cook: { min: 10000, max: 20000 },
    babysitter: { min: 10000, max: 18000 },
    elderly_caregiver: { min: 12000, max: 22000 },
    driver: { min: 12000, max: 25000 },
    security_guard: { min: 9000, max: 16000 },
    gardener: { min: 7000, max: 14000 },
    cleaner: { min: 6000, max: 12000 },
    laundry_helper: { min: 5000, max: 10000 },
    home_attendant: { min: 10000, max: 20000 },
  },
  Delhi: {
    housemaid: { min: 7000, max: 14000 },
    cook: { min: 9000, max: 18000 },
    babysitter: { min: 9000, max: 16000 },
    elderly_caregiver: { min: 10000, max: 20000 },
    driver: { min: 11000, max: 22000 },
    security_guard: { min: 8000, max: 15000 },
    gardener: { min: 6000, max: 12000 },
    cleaner: { min: 5000, max: 11000 },
    laundry_helper: { min: 4500, max: 9000 },
    home_attendant: { min: 9000, max: 18000 },
  },
  Bangalore: {
    housemaid: { min: 7500, max: 16000 },
    cook: { min: 10000, max: 22000 },
    babysitter: { min: 10000, max: 19000 },
    elderly_caregiver: { min: 12000, max: 24000 },
    driver: { min: 13000, max: 26000 },
    security_guard: { min: 9000, max: 17000 },
    gardener: { min: 7000, max: 15000 },
    cleaner: { min: 6000, max: 13000 },
    laundry_helper: { min: 5000, max: 10000 },
    home_attendant: { min: 10000, max: 21000 },
  },
};

const DEFAULT_SALARY: Record<string, { min: number; max: number }> = {
  housemaid: { min: 6000, max: 13000 },
  cook: { min: 8000, max: 17000 },
  babysitter: { min: 8000, max: 15000 },
  elderly_caregiver: { min: 10000, max: 18000 },
  driver: { min: 10000, max: 20000 },
  security_guard: { min: 7000, max: 14000 },
  gardener: { min: 5000, max: 11000 },
  cleaner: { min: 5000, max: 10000 },
  laundry_helper: { min: 4000, max: 8000 },
  home_attendant: { min: 8000, max: 16000 },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'salary-estimate') {
    const city = searchParams.get('city') || 'Mumbai';
    const role = searchParams.get('role') || 'housemaid';
    const experience = parseInt(searchParams.get('experience') || '0');
    const availability = searchParams.get('availability') || 'full-time';

    const cityData = SALARY_DATA[city] || {};
    const roleData = cityData[role] || DEFAULT_SALARY[role] || { min: 5000, max: 12000 };

    let { min, max } = roleData;

    // Experience multiplier
    const expMultiplier = 1 + (Math.min(experience, 20) * 0.03);
    min = Math.round(min * expMultiplier);
    max = Math.round(max * expMultiplier);

    // Availability adjustment
    if (availability === 'live-in') {
      min = Math.round(min * 0.85);
      max = Math.round(max * 0.9);
    } else if (availability === 'part-time') {
      min = Math.round(min * 0.5);
      max = Math.round(max * 0.6);
    }

    return NextResponse.json({
      city,
      role,
      experience,
      availability,
      salaryRange: { min, max },
      median: Math.round((min + max) / 2),
      recommendation: `Based on ${experience} years of experience in ${city}, a fair salary for this ${role} role would be between ₹${min.toLocaleString('en-IN')} and ₹${max.toLocaleString('en-IN')} per month.`,
    });
  }

  if (type === 'recommend') {
    // Simple recommendation logic based on preferences
    const role = searchParams.get('role') || 'housemaid';
    const city = searchParams.get('city') || 'Mumbai';
    const maxSalary = parseInt(searchParams.get('maxSalary') || '999999');
    const minRating = parseFloat(searchParams.get('minRating') || '4.0');

    return NextResponse.json({
      recommendation: `Based on your preferences, we recommend looking for ${role}s in ${city} with ratings above ${minRating} and salary expectations within your budget. Focus on verified workers with relevant experience for the best match.`,
      tips: [
        'Always verify documents in person before finalizing',
        'Start with a 7-day trial period',
        'Discuss work hours and holidays clearly upfront',
        'Check references from previous employers',
        'Use our digital contract feature for clarity',
      ],
    });
  }

  if (type === 'translate') {
    const text = searchParams.get('text') || '';
    const from = searchParams.get('from') || 'en';
    const to = searchParams.get('to') || 'hi';

    // Simulated translation (in production, use a real translation API)
    const translations: Record<string, Record<string, string>> = {
      'hello': { hi: 'नमस्ते', ta: 'வணக்கம்', te: 'నమస్కారం', bn: 'নমস্কার' },
      'when can you start': { hi: 'आप कब से शुरू कर सकते हैं?', ta: 'நீங்கள் எப்போது தொடங்க முடியும்?', te: 'మీరు ఎప్పుడు ప్రారంభించగలరు?', bn: 'আপনি কখন শুরু করতে পারবেন?' },
      'what is your salary expectation': { hi: 'आपकी वेतन अपेक्षा क्या है?', ta: 'உங்கள் சம்பள எதிர்பார்ப்பு என்ன?', te: 'మీ జీతం ఆశించేది ఏమిటి?', bn: 'আপনার বেতন প্রত্যাশা কী?' },
      'thank you': { hi: 'धन्यवाद', ta: 'நன்றி', te: 'ధన్యవాదాలు', bn: 'ধন্যবাদ' },
      'i need help with cooking': { hi: 'मुझे खाना बनाने में मदद चाहिए', ta: 'எனக்கு சமையலில் உதவி வேண்டும்', te: 'నాకు వంటలో సహాయం కావాలి', bn: 'আমার রান্নায় সাহায্য প্রয়োজন' },
    };

    const key = text.toLowerCase();
    const langTranslations = translations[key];
    const translated = langTranslations?.[to] || text;

    return NextResponse.json({
      original: text,
      from,
      to,
      translated,
      note: 'This is a demo translation. Production version would use a professional translation API.',
    });
  }

  return NextResponse.json({ error: 'Invalid AI tool type' }, { status: 400 });
}