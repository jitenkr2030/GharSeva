# GharSeva - India's Verified Home Services Workforce Platform

<p align="center">
  <strong>GharSeva</strong> connects Indian families with verified, trusted domestic workers across 15+ cities. Built with Next.js 16, TypeScript, Prisma, and Tailwind CSS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/NextAuth-4-red?logo=next.js" alt="NextAuth" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Demo Accounts](#demo-accounts)
- [Screenshots](#screenshots)
- [Revenue Model](#revenue-model)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

GharSeva is a full-stack web platform designed to solve India's unorganized domestic workforce problem. It provides a **verified, transparent, and digital** marketplace where families can find trusted domestic workers — housemaids, cooks, babysitters, elderly caregivers, drivers, security guards, gardeners, cleaners, laundry helpers, and home attendants.

Every worker on GharSeva undergoes **Aadhaar verification** and **police background checks**. Families can browse worker profiles, read genuine reviews, compare salary expectations, and hire with confidence through **digital contracts**. The platform also features an **AI-powered salary estimator**, **language translation**, and **smart recommendations**.

---

## Key Features

### For Families (Employers)
- **Browse & Search Workers** — Filter by role, city, availability, salary range, verification status, and ratings
- **Worker Profiles** — Detailed profiles with skills, languages, experience, reviews, and verification badges
- **Digital Booking** — Hire workers with structured booking and contract management
- **Attendance Tracking** — Track daily attendance with check-in/check-out times and half-day/leave management
- **Salary Management** — View salary records, track payment status, and mark payments as complete
- **Review System** — Rate and review workers to maintain platform quality
- **AI Salary Estimator** — Get fair salary ranges based on role, city, and experience level
- **AI Recommendations** — Receive personalized tips for hiring and managing domestic workers
- **Language Translation** — Translate common phrases into Hindi, Tamil, Telugu, and Bengali

### For Workers
- **Job Listings** — Browse available jobs across 15+ Indian cities
- **Easy Registration** — Quick sign-up process with role selection (worker/family)
- **Profile Building** — Showcase skills, languages, experience, and verification status
- **Premium Profiles** — Stand out with premium badges and priority placement
- **Training Courses** — Access professional development and skill enhancement courses
- **Application Tracking** — Track job application status from applied to accepted

### Platform Features
- **Authentication System** — Secure login/registration with role-based access (Admin, Employer, Worker)
- **Dark/Light Mode** — Full theme support with warm orange and green accent palette
- **Responsive Design** — Mobile-first design that works on all screen sizes
- **AI-Powered Tools** — Salary estimation, worker recommendations, and language translation
- **Subscription Plans** — Free, Basic, Premium, and Enterprise tiers with different features

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + tw-animate-css |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Database** | SQLite via Prisma ORM 6 |
| **Authentication** | NextAuth.js 4 (Credentials Provider) |
| **State Management** | Zustand 5 |
| **Data Fetching** | TanStack React Query 5 |
| **Animations** | Framer Motion 12 |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Password Hashing** | bcryptjs |
| **Package Manager** | Bun |

---

## Project Structure

```
gharseva/
├── prisma/
│   └── schema.prisma          # Database models (User, Worker, Employer, Booking, Review, etc.)
├── public/
│   ├── logo.svg               # GharSeva logo
│   └── robots.txt             # SEO robots
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts        # NextAuth handler
│   │   │   │   └── register/
│   │   │   │       └── route.ts        # User registration
│   │   │   ├── ai/route.ts             # AI tools (salary, recommend, translate)
│   │   │   ├── bookings/route.ts       # Booking CRUD
│   │   │   ├── reviews/route.ts        # Review CRUD
│   │   │   ├── seed/route.ts           # Database seeder with demo data
│   │   │   └── workers/
│   │   │       ├── route.ts            # Worker list (search, filter, paginate)
│   │   │       └── [id]/route.ts       # Single worker detail
│   │   ├── globals.css                 # Custom theme (oklch colors, dark mode)
│   │   ├── layout.tsx                  # Root layout with providers
│   │   └── page.tsx                    # Main SPA page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── auth-modal.tsx          # Login/Register modal with demo accounts
│   │   │   └── auth-provider.tsx       # NextAuth SessionProvider wrapper
│   │   ├── ui/                         # shadcn/ui components
│   │   ├── navbar.tsx                  # Header with auth state, nav, user menu
│   │   ├── footer.tsx                  # 4-column footer
│   │   ├── hero-section.tsx            # Landing page hero with stats, categories
│   │   ├── browse-workers.tsx          # Worker directory with filters & pagination
│   │   ├── worker-detail.tsx           # Full worker profile with booking & reviews
│   │   ├── for-workers-section.tsx     # Worker-side features (jobs, register, training)
│   │   ├── pricing-section.tsx         # Subscription plans & pricing
│   │   ├── dashboard-section.tsx       # Attendance, salary, leave management
│   │   └── ai-tools-section.tsx        # AI salary estimator, recommendations, translation
│   ├── hooks/
│   │   ├── use-auth.ts                 # Auth hook (login, logout, user info)
│   │   ├── use-mobile.ts               # Mobile breakpoint detection
│   │   └── use-toast.ts                # Toast notification hook
│   ├── lib/
│   │   ├── auth.ts                     # NextAuth configuration
│   │   ├── db.ts                       # Prisma client singleton
│   │   ├── query-provider.tsx          # TanStack Query provider
│   │   └── utils.ts                    # Utility functions (cn, etc.)
│   ├── store/
│   │   └── app-store.ts                # Zustand store (navigation, filters, modals)
│   └── types/
│       └── index.ts                    # TypeScript interfaces & constants
├── .env.example                        # Environment variable template
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **npm** or **bun** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jitenkr2030/GharSeva.git
   cd GharSeva
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Initialize the database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** — The database will auto-seed with demo data on first load.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack on port 3000 |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run database migrations |

---

## Authentication

GharSeva uses **NextAuth.js** with a Credentials provider for email/password authentication.

### User Roles

| Role | Description | Access |
|------|-------------|--------|
| `admin` | Platform administrator | Full platform access, user management |
| `employer` | Family/household employer | Browse workers, book, manage attendance & salary |
| `worker` | Domestic worker | Profile management, job applications, training |

### Auth Flow

1. **Registration:** User selects role (Employer/Worker), provides name, email, phone, and password
2. **Password Security:** Passwords are hashed with bcryptjs (12 salt rounds)
3. **Session Management:** JWT-based sessions with 30-day expiry
4. **Protected Data:** Session tokens carry role, workerId, and employerId for server-side access control

### Demo Accounts

Use these pre-seeded accounts to explore the platform:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gharseva.in` | `admin123` |
| Family (Employer) | `family@gharseva.in` | `family123` |
| Worker | `worker@gharseva.in` | `worker123` |

---

## API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | NextAuth sign-in, sign-out, session |
| POST | `/api/auth/register` | Register new user |

### Workers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workers` | List workers (search, filter, sort, paginate) |
| POST | `/api/workers` | Create worker profile |
| GET | `/api/workers/[id]` | Get worker detail with reviews, attendance, salary |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | List bookings |
| POST | `/api/bookings` | Create booking |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | List reviews |
| POST | `/api/reviews` | Create review (updates worker rating) |

### AI Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai` | AI salary estimator, recommendations, translation |

### Database
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seed` | Seed database with demo data |

### Query Parameters (Workers API)

```
GET /api/workers?role=cook&city=Mumbai&availability=full-time&verified=true&ratingMin=4&salaryMin=5000&salaryMax=20000&sortBy=rating&search=sunita&page=1&limit=12
```

---

## Database Schema

The platform uses **8 interconnected models**:

```
User ─────────┬── Worker
              └── Employer

Worker ──┬── Review ←── Employer
         ├── Booking ←── Employer
         ├── Attendance
         ├── SalaryRecord
         └── JobApplication
```

### Core Models

- **User** — Authentication accounts with role-based access (admin/employer/worker)
- **Worker** — 10 role types, skills/languages stored as JSON, Aadhaar & police verification flags
- **Employer** — Family profiles with subscription plans (free/basic/premium/enterprise)
- **Booking** — Worker-employer engagements with status tracking (pending/active/completed)
- **Review** — Employer ratings and comments for workers (updates worker aggregate rating)
- **Attendance** — Daily check-in/check-out tracking with present/half-day/leave/absent statuses
- **SalaryRecord** — Monthly salary records with payment status tracking
- **JobApplication** — Worker job applications with status workflow

---

## Demo Data

The seed script creates:

| Entity | Count | Details |
|--------|-------|---------|
| Users | 3 | Admin, Family (linked to employer), Worker (linked to worker) |
| Workers | 24 | Across 10 roles, 10 cities, with realistic Indian names and data |
| Employers | 5 | Across Mumbai, Delhi, Bangalore, Hyderabad, Chennai |
| Reviews | 60 | Distributed across workers with varied ratings |
| Bookings | 10 | Mix of active, completed, and pending |
| Attendance | 30 | Full month for demo worker with leaves and half-days |
| Salary Records | 6 | 6 months of salary data (5 paid, 1 pending) |
| Job Applications | 15 | Across various statuses |

---

## Revenue Model

| Revenue Stream | Pricing | Description |
|---------------|---------|-------------|
| **Free Plan** | No cost | Basic browsing, limited contacts |
| **Basic Plan** | 199/month | Full profiles, 5 contacts/month |
| **Premium Plan** | 499/month | Unlimited contacts, priority support |
| **Enterprise Plan** | 999/month | Multi-family, dedicated manager |
| **Placement Fee** | One-time | Charged on successful hire |
| **Premium Profile** | 99/month | Workers: boosted visibility |
| **Training Courses** | 299-999/course | Professional development |
| **Payroll Service** | 2% of salary | Managed salary processing |

---

## Design System

- **Primary Color:** Warm Orange (`oklch(0.65 0.2 40)`)
- **Accent Color:** Soft Green (`oklch(0.95 0.03 140)`)
- **Typography:** Geist Sans (body) + Geist Mono (code)
- **Dark Mode:** Full support with adjusted oklch values
- **Component Library:** shadcn/ui with Radix UI primitives
- **Animations:** Framer Motion for transitions and reveals

---

## Roadmap

- [ ] Google & GitHub OAuth providers
- [ ] Razorpay/Stripe payment integration
- [ ] Real-time chat between workers and employers
- [ ] Mobile app (React Native)
- [ ] Voice-based job applications (Web Speech API)
- [ ] Advanced fraud detection (AI/ML)
- [ ] Expansion: appliance repair, plumbing, electrical
- [ ] Multi-language UI (Hindi, Tamil, Telugu)
- [ ] Admin dashboard with analytics
- [ ] Push notifications
- [ ] Digital contract signing (DocuSign integration)
- [ ] GPS-based attendance verification

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint configured)
- Use TypeScript for all new files
- Write descriptive commit messages
- Test your changes thoroughly before submitting

---

## License

This project is licensed under the MIT License.

---

<p align="center">
  Built with care for India's domestic workforce. <br />
  <strong>GharSeva</strong> — Your Home, Our Responsibility.
</p>