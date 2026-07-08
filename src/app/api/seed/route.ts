import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Clear existing data (order matters due to relations)
    await db.review.deleteMany();
    await db.attendance.deleteMany();
    await db.salaryRecord.deleteMany();
    await db.jobApplication.deleteMany();
    await db.booking.deleteMany();
    await db.user.deleteMany();
    await db.employer.deleteMany();
    await db.worker.deleteMany();

    // Create employers
    const employers = await Promise.all([
      db.employer.create({
        data: { name: 'Priya Sharma', phone: '9876543210', email: 'priya@email.com', city: 'Mumbai', locality: 'Andheri West', plan: 'premium' },
      }),
      db.employer.create({
        data: { name: 'Rajesh Gupta', phone: '9876543211', email: 'rajesh@email.com', city: 'Delhi', locality: 'Saket', plan: 'basic' },
      }),
      db.employer.create({
        data: { name: 'Anita Desai', phone: '9876543212', email: 'anita@email.com', city: 'Bangalore', locality: 'Koramangala', plan: 'premium' },
      }),
      db.employer.create({
        data: { name: 'Vikram Patel', phone: '9876543213', city: 'Hyderabad', locality: 'Jubilee Hills', plan: 'free' },
      }),
      db.employer.create({
        data: { name: 'Meera Krishnan', phone: '9876543214', email: 'meera@email.com', city: 'Chennai', locality: 'Adyar', plan: 'basic' },
      }),
    ]);

    // Create demo admin and family users
    await db.user.create({
      data: {
        name: 'GharSeva Admin',
        email: 'admin@gharseva.in',
        password: await hash('admin123', 12),
        role: 'admin',
        isVerified: true,
      },
    });
    await db.user.create({
      data: {
        name: 'Priya Sharma',
        email: 'family@gharseva.in',
        password: await hash('family123', 12),
        phone: '9876543210',
        role: 'employer',
        isVerified: true,
        employerId: employers[0].id,
      },
    });

    // Create workers with rich data
    const workersData = [
      { name: 'Sunita Devi', phone: '9812345001', age: 35, gender: 'female', role: 'housemaid', city: 'Mumbai', locality: 'Dadar', experienceYears: 8, salaryExpectation: 12000, availabilityType: 'full-time', languages: ['Hindi', 'Marathi'], skills: ['Deep cleaning', 'Kitchen maintenance', 'Washing', 'Ironing'], about: 'Experienced housemaid with 8 years of work in Mumbai households. Known for punctuality and thorough cleaning.', aadhaarVerified: true, policeVerified: true, rating: 4.8, reviewCount: 24, isPremium: true },
      { name: 'Lakshmi Iyer', phone: '9812345002', age: 42, gender: 'female', role: 'cook', city: 'Chennai', locality: 'T. Nagar', experienceYears: 12, salaryExpectation: 15000, availabilityType: 'full-time', languages: ['Tamil', 'Hindi', 'English'], skills: ['South Indian cuisine', 'North Indian cuisine', 'Baking', 'Meal planning'], about: 'Expert cook specializing in South Indian and North Indian cuisines. Can prepare meals for large families and small gatherings.', aadhaarVerified: true, policeVerified: true, rating: 4.9, reviewCount: 31, isPremium: true },
      { name: 'Geeta Rani', phone: '9812345003', age: 28, gender: 'female', role: 'babysitter', city: 'Delhi', locality: 'Rohini', experienceYears: 5, salaryExpectation: 14000, availabilityType: 'full-time', languages: ['Hindi', 'Punjabi', 'English'], skills: ['Childcare', 'Early education', 'First aid', 'Activities planning'], about: 'Trained babysitter who loves working with children. Can handle kids from 6 months to 10 years. CPR certified.', aadhaarVerified: true, policeVerified: true, rating: 4.7, reviewCount: 18, isPremium: false },
      { name: 'Ram Singh', phone: '9812345004', age: 45, gender: 'male', role: 'driver', city: 'Bangalore', locality: 'Whitefield', experienceYears: 15, salaryExpectation: 18000, availabilityType: 'full-time', languages: ['Hindi', 'Kannada', 'English', 'Telugu'], skills: ['City driving', 'Highway driving', 'Car maintenance', 'GPS navigation'], about: 'Experienced driver with clean record. Knows Bangalore and surrounding areas thoroughly. Can drive both automatic and manual vehicles.', aadhaarVerified: true, policeVerified: true, rating: 4.6, reviewCount: 12, isPremium: true },
      { name: 'Shanti Bai', phone: '9812345005', age: 50, gender: 'female', role: 'elderly_caregiver', city: 'Pune', locality: 'Kothrud', experienceYears: 10, salaryExpectation: 16000, availabilityType: 'live-in', languages: ['Marathi', 'Hindi'], skills: ['Elderly care', 'Medication reminders', 'Physiotherapy support', 'Companionship'], about: 'Compassionate caregiver with 10 years experience in elderly care. Trained in basic nursing support and physiotherapy assistance.', aadhaarVerified: true, policeVerified: true, rating: 4.9, reviewCount: 15, isPremium: true },
      { name: 'Ramesh Kumar', phone: '9812345006', age: 38, gender: 'male', role: 'security_guard', city: 'Hyderabad', locality: 'Madhapur', experienceYears: 7, salaryExpectation: 13000, availabilityType: 'full-time', languages: ['Telugu', 'Hindi', 'English'], skills: ['Security monitoring', 'Access control', 'Emergency response', 'CCTV operation'], about: 'Trained security guard with PSARA license. Experienced in residential and commercial security operations.', aadhaarVerified: true, policeVerified: true, rating: 4.5, reviewCount: 9, isPremium: false },
      { name: 'Kamla Devi', phone: '9812345007', age: 33, gender: 'female', role: 'housemaid', city: 'Mumbai', locality: 'Borivali', experienceYears: 6, salaryExpectation: 10000, availabilityType: 'part-time', languages: ['Hindi', 'Marathi', 'Bhojpuri'], skills: ['Cleaning', 'Dusting', 'Mopping', 'Organizing'], about: 'Hardworking and honest housemaid. Available for morning or evening shifts. Very particular about cleanliness.', aadhaarVerified: true, policeVerified: false, rating: 4.3, reviewCount: 11, isPremium: false },
      { name: 'Raju Verma', phone: '9812345008', age: 30, gender: 'male', role: 'gardener', city: 'Jaipur', locality: 'Vaishali Nagar', experienceYears: 8, salaryExpectation: 11000, availabilityType: 'part-time', languages: ['Hindi', 'Rajasthani'], skills: ['Lawn maintenance', 'Plant care', 'Landscape design', 'Pest control for plants'], about: 'Skilled gardener who can maintain any type of garden - from small balcony plants to large lawns. Knowledgeable about seasonal plants.', aadhaarVerified: true, policeVerified: true, rating: 4.4, reviewCount: 7, isPremium: false },
      { name: 'Priya Kumari', phone: '9812345009', age: 26, gender: 'female', role: 'cook', city: 'Delhi', locality: 'Dwarka', experienceYears: 4, salaryExpectation: 12000, availabilityType: 'full-time', languages: ['Hindi', 'English', 'Bengali'], skills: ['North Indian cuisine', 'Continental', 'Chinese', 'Baking'], about: 'Young and energetic cook who can prepare a variety of cuisines. Specializes in North Indian food and baking.', aadhaarVerified: true, policeVerified: true, rating: 4.6, reviewCount: 14, isPremium: true },
      { name: 'Mohammed Iqbal', phone: '9812345010', age: 40, gender: 'male', role: 'driver', city: 'Mumbai', locality: 'Andheri East', experienceYears: 18, salaryExpectation: 20000, availabilityType: 'full-time', languages: ['Hindi', 'English', 'Marathi', 'Urdu'], skills: ['Long-distance driving', 'Corporate chauffeuring', 'Car maintenance', 'Route optimization'], about: 'Highly experienced corporate driver. Has worked with senior executives. Known for safe driving and time management.', aadhaarVerified: true, policeVerified: true, rating: 4.8, reviewCount: 22, isPremium: true },
      { name: 'Meena Kumari', phone: '9812345011', age: 38, gender: 'female', role: 'cleaner', city: 'Bangalore', locality: 'HSR Layout', experienceYears: 9, salaryExpectation: 9000, availabilityType: 'part-time', languages: ['Kannada', 'Hindi', 'Tamil'], skills: ['Deep cleaning', 'Bathroom cleaning', 'Kitchen deep clean', 'Post-construction cleanup'], about: 'Specialist in deep cleaning services. Can handle move-in/move-out cleaning, party cleanup, and regular maintenance cleaning.', aadhaarVerified: true, policeVerified: true, rating: 4.5, reviewCount: 16, isPremium: false },
      { name: 'Anwar Hussain', phone: '9812345012', age: 48, gender: 'male', role: 'home_attendant', city: 'Kolkata', locality: 'Salt Lake', experienceYears: 12, salaryExpectation: 14000, availabilityType: 'live-in', languages: ['Bengali', 'Hindi', 'English'], skills: ['Household management', 'Cooking', 'Driving', 'Maintenance coordination'], about: 'Versatile home attendant who can manage all aspects of a household. From cooking to coordinating repairs, handles everything efficiently.', aadhaarVerified: true, policeVerified: true, rating: 4.7, reviewCount: 19, isPremium: true },
      { name: 'Saroja Nair', phone: '9812345013', age: 36, gender: 'female', role: 'babysitter', city: 'Chennai', locality: 'Velachery', experienceYears: 7, salaryExpectation: 13000, availabilityType: 'full-time', languages: ['Tamil', 'Hindi', 'Malayalam', 'English'], skills: ['Infant care', 'Toddler activities', 'Homework help', 'Nutrition planning'], about: 'Experienced nanny who has worked with multiple families. Gentle and patient with children. Can help with school homework too.', aadhaarVerified: true, policeVerified: true, rating: 4.8, reviewCount: 21, isPremium: true },
      { name: 'Deepak Yadav', phone: '9812345014', age: 32, gender: 'male', role: 'laundry_helper', city: 'Ahmedabad', locality: 'Navrangpura', experienceYears: 5, salaryExpectation: 8000, availabilityType: 'part-time', languages: ['Hindi', 'Gujarati'], skills: ['Washing', 'Ironing', 'Dry cleaning coordination', 'Fabric care'], about: 'Expert in all types of fabric care. Can handle delicate silk, wool, and everyday clothes with equal expertise.', aadhaarVerified: true, policeVerified: false, rating: 4.2, reviewCount: 8, isPremium: false },
      { name: 'Nirmala Devi', phone: '9812345015', age: 44, gender: 'female', role: 'elderly_caregiver', city: 'Delhi', locality: 'Greater Kailash', experienceYears: 14, salaryExpectation: 18000, availabilityType: 'live-in', languages: ['Hindi', 'Punjabi', 'English'], skills: ['Dementia care', 'Diabetes management', 'Physiotherapy assistance', 'Emotional support'], about: 'Highly trained caregiver specializing in elderly patients with dementia and diabetes. Very patient and compassionate.', aadhaarVerified: true, policeVerified: true, rating: 4.9, reviewCount: 27, isPremium: true },
      { name: 'Suresh Patel', phone: '9812345016', age: 29, gender: 'male', role: 'security_guard', city: 'Pune', locality: 'Hinjewadi', experienceYears: 4, salaryExpectation: 12000, availabilityType: 'full-time', languages: ['Hindi', 'Marathi', 'English'], skills: ['IT park security', 'Access control systems', 'Patrolling', 'Incident reporting'], about: 'Young and energetic security guard trained in modern security systems. Ideal for IT parks and corporate offices.', aadhaarVerified: true, policeVerified: true, rating: 4.3, reviewCount: 6, isPremium: false },
      { name: 'Asha Ben', phone: '9812345017', age: 31, gender: 'female', role: 'housemaid', city: 'Ahmedabad', locality: 'Satellite', experienceYears: 5, salaryExpectation: 9500, availabilityType: 'part-time', languages: ['Gujarati', 'Hindi'], skills: ['House cleaning', 'Kitchen cleaning', 'Laundry', 'Dish washing'], about: 'Dedicated and trustworthy housemaid. Maintains excellent hygiene standards. Punctual and regular.', aadhaarVerified: true, policeVerified: true, rating: 4.4, reviewCount: 10, isPremium: false },
      { name: 'Venkatesh Rao', phone: '9812345018', age: 52, gender: 'male', role: 'gardener', city: 'Hyderabad', locality: 'Banjara Hills', experienceYears: 20, salaryExpectation: 14000, availabilityType: 'full-time', languages: ['Telugu', 'Hindi', 'English'], skills: ['Garden design', 'Rose gardening', 'Vegetable garden', 'Irrigation systems'], about: 'Master gardener with 20 years experience. Can design and maintain beautiful gardens. Specializes in rose gardens and organic vegetables.', aadhaarVerified: true, policeVerified: true, rating: 4.7, reviewCount: 13, isPremium: true },
      { name: 'Kavitha Subramaniam', phone: '9812345019', age: 27, gender: 'female', role: 'cook', city: 'Bangalore', locality: 'Indiranagar', experienceYears: 3, salaryExpectation: 11000, availabilityType: 'part-time', languages: ['Tamil', 'Kannada', 'Hindi', 'English'], skills: ['South Indian', 'Chettinad cuisine', 'Healthy cooking', 'Diet meals'], about: 'Young chef passionate about healthy cooking. Can prepare low-oil, diet-specific meals. Expert in Chettinad cuisine.', aadhaarVerified: true, policeVerified: true, rating: 4.5, reviewCount: 9, isPremium: false },
      { name: 'Bhagwat Prasad', phone: '9812345020', age: 55, gender: 'male', role: 'home_attendant', city: 'Lucknow', locality: 'Gomti Nagar', experienceYears: 16, salaryExpectation: 12000, availabilityType: 'full-time', languages: ['Hindi', 'Urdu', 'English'], skills: ['Household repairs', 'Plumbing basics', 'Electrical basics', 'Grocery management'], about: 'Multi-skilled home attendant who can handle minor repairs along with regular household duties. Very reliable and honest.', aadhaarVerified: true, policeVerified: true, rating: 4.6, reviewCount: 17, isPremium: true },
      { name: 'Rekha Devi', phone: '9812345021', age: 39, gender: 'female', role: 'housemaid', city: 'Kolkata', locality: 'Lake Town', experienceYears: 11, salaryExpectation: 10500, availabilityType: 'full-time', languages: ['Bengali', 'Hindi'], skills: ['Cleaning', 'Organizing', 'Pooja room maintenance', 'Festival preparation'], about: 'Experienced housemaid from Kolkata. Maintains cleanliness with attention to detail. Special care for pooja rooms and festival preparations.', aadhaarVerified: true, policeVerified: true, rating: 4.5, reviewCount: 20, isPremium: false },
      { name: 'Arun Kumar', phone: '9812345022', age: 34, gender: 'male', role: 'driver', city: 'Chennai', locality: 'Anna Nagar', experienceYears: 9, salaryExpectation: 16000, availabilityType: 'full-time', languages: ['Tamil', 'Hindi', 'English', 'Telugu'], skills: ['Family driving', 'School drop-off', 'Office commute', 'Outstation trips'], about: 'Reliable family driver. Knows all school routes in Chennai. Comfortable with long-distance drives to Pondicherry, Bangalore, and Kerala.', aadhaarVerified: true, policeVerified: true, rating: 4.4, reviewCount: 11, isPremium: false },
      { name: 'Pushpa Rani', phone: '9812345023', age: 41, gender: 'female', role: 'cleaner', city: 'Delhi', locality: 'Vasant Kunj', experienceYears: 10, salaryExpectation: 10000, availabilityType: 'part-time', languages: ['Hindi', 'Punjabi'], skills: ['Deep cleaning', 'Sofa cleaning', 'Carpet cleaning', 'Window cleaning'], about: 'Professional cleaner with expertise in deep cleaning services. Brings her own equipment and cleaning supplies.', aadhaarVerified: true, policeVerified: true, rating: 4.6, reviewCount: 15, isPremium: false },
      { name: 'Krishna Murthy', phone: '9812345024', age: 37, gender: 'male', role: 'security_guard', city: 'Bangalore', locality: 'Electronic City', experienceYears: 8, salaryExpectation: 13500, availabilityType: 'full-time', languages: ['Kannada', 'Hindi', 'English', 'Tamil'], skills: ['Corporate security', 'Fire safety', 'Crowd management', 'Emergency first aid'], about: 'Trained corporate security professional. Fire safety certified. Can handle access control for large tech parks.', aadhaarVerified: true, policeVerified: true, rating: 4.5, reviewCount: 10, isPremium: false },
    ];

    const workers = await Promise.all(
      workersData.map((w) =>
        db.worker.create({
          data: {
            ...w,
            roles: JSON.stringify([w.role]),
            languages: JSON.stringify(w.languages),
            skills: JSON.stringify(w.skills),
          },
        })
      )
    );

    // Create worker user (after workers exist)
    await db.user.create({
      data: {
        name: 'Sunita Devi',
        email: 'worker@gharseva.in',
        password: await hash('worker123', 12),
        phone: '9812345001',
        role: 'worker',
        isVerified: true,
        workerId: workers[0].id,
      },
    });

    // Create reviews
    const reviewComments = [
      'Very professional and punctual. Highly recommended!',
      'Excellent work. My home has never been cleaner.',
      'Trustworthy and hardworking. She takes great care of everything.',
      'Good communication and always on time. Very satisfied.',
      'Outstanding service. Went above and beyond expectations.',
      'Very skilled and experienced. Knows her work well.',
      'Polite and respectful. My family loves her.',
      'Reliable and consistent. Has been working with us for months.',
      'Very patient with the children. Kids are always happy to see her.',
      'Clean driving record and very punctual. Highly recommended for families.',
      'Excellent cooking skills. The food is always delicious.',
      'Takes great care of the garden. Plants are thriving!',
      'Very caring and attentive to the elderly. We feel safe.',
      'Does thorough cleaning every time. No complaints at all.',
      'Multi-talented and manages everything efficiently.',
    ];

    for (let i = 0; i < 60; i++) {
      const worker = workers[i % workers.length];
      const employer = employers[i % employers.length];
      await db.review.create({
        data: {
          workerId: worker.id,
          employerId: employer.id,
          rating: Math.min(5, Math.max(3, Math.round((worker.rating || 4) + (Math.random() - 0.5) * 0.8))),
          comment: reviewComments[i % reviewComments.length],
        },
      });
    }

    // Create some bookings
    for (let i = 0; i < 10; i++) {
      const worker = workers[i % workers.length];
      const employer = employers[i % employers.length];
      const statuses = ['active', 'completed', 'pending'];
      const startMonth = Math.floor(Math.random() * 9);
      const endMonth = statuses[i % 3] === 'completed' ? startMonth + 3 : null;
      await db.booking.create({
        data: {
          workerId: worker.id,
          employerId: employer.id,
          status: statuses[i % 3],
          startDate: new Date(2025, startMonth, 1),
          endDate: endMonth !== null ? new Date(2025, endMonth, 1) : null,
          salary: worker.salaryExpectation,
          notes: i % 2 === 0 ? 'Regular monthly arrangement' : 'Trial period',
        },
      });
    }

    // Create attendance records for demo worker
    const demoWorker = workers[0];
    for (let d = 1; d <= 30; d++) {
      const date = `2025-06-${String(d).padStart(2, '0')}`;
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0) {
        await db.attendance.create({
          data: { workerId: demoWorker.id, date, status: 'leave', notes: 'Weekly off' },
        });
      } else if (d === 15) {
        await db.attendance.create({
          data: { workerId: demoWorker.id, date, status: 'half-day', checkIn: '08:00', checkOut: '13:00', notes: 'Personal work' },
        });
      } else {
        await db.attendance.create({
          data: { workerId: demoWorker.id, date, status: 'present', checkIn: '07:30', checkOut: '18:00' },
        });
      }
    }

    // Create salary records
    for (let m = 1; m <= 6; m++) {
      await db.salaryRecord.create({
        data: {
          workerId: demoWorker.id,
          month: `2025-${String(m).padStart(2, '0')}`,
          amount: demoWorker.salaryExpectation || 12000,
          paidOn: m < 6 ? new Date(2025, m, 5) : null,
          status: m < 6 ? 'paid' : 'pending',
        },
      });
    }

    // Create job applications
    const jobTitles = ['Housemaid needed in Andheri', 'Cook for family of 5', 'Babysitter for toddler', 'Full-time driver required', 'Elderly care for senior citizen'];
    for (let i = 0; i < 15; i++) {
      const worker = workers[i % workers.length];
      const statuses = ['applied', 'interview', 'offered', 'accepted', 'rejected'];
      await db.jobApplication.create({
        data: {
          workerId: worker.id,
          jobTitle: jobTitles[i % jobTitles.length],
          employerName: employers[i % employers.length].name,
          city: worker.city,
          salary: worker.salaryExpectation,
          status: statuses[i % statuses.length],
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      workersCreated: workers.length,
      employersCreated: employers.length,
      usersCreated: 3,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}