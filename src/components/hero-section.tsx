'use client';

import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, Search, Star, Users, ArrowRight, CheckCircle2,
  Home, ChefHat, Baby, HeartPulse, Car, ShieldCheck, TreePine, Sparkles, Shirt, Building,
} from 'lucide-react';
import { ROLE_LABELS, ROLE_ICONS, CITIES } from '@/types';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const roles = [
  { key: 'housemaid', icon: Home },
  { key: 'cook', icon: ChefHat },
  { key: 'babysitter', icon: Baby },
  { key: 'elderly_caregiver', icon: HeartPulse },
  { key: 'driver', icon: Car },
  { key: 'security_guard', icon: ShieldCheck },
  { key: 'gardener', icon: TreePine },
  { key: 'cleaner', icon: Sparkles },
  { key: 'laundry_helper', icon: Shirt },
  { key: 'home_attendant', icon: Building },
];

const stats = [
  { value: '25,000+', label: 'Verified Workers' },
  { value: '15+', label: 'Cities Covered' },
  { value: '4.7', label: 'Average Rating' },
  { value: '10,000+', label: 'Happy Families' },
];

const trustFeatures = [
  { icon: Shield, title: 'Aadhaar & KYC Verified', desc: 'Every worker\'s identity is verified through government-issued Aadhaar cards with consent-based background checks.' },
  { icon: ShieldCheck, title: 'Police Verification', desc: 'Comprehensive police verification status displayed on every profile so you can hire with complete confidence.' },
  { icon: Star, title: 'Employer Ratings', desc: 'Real ratings and reviews from verified employers help you make informed hiring decisions for your household.' },
  { icon: CheckCircle2, title: 'Digital Contracts', desc: 'Formalize the employment relationship with legally compliant digital contracts protecting both parties.' },
  { icon: Users, title: 'Replacement Guarantee', desc: 'If a worker doesn\'t work out, we provide fast and reliable replacement within 48 hours at no extra cost.' },
  { icon: Search, title: 'Smart Matching', desc: 'Our AI recommends the best workers based on your preferences, location, budget, and specific requirements.' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const { setView, setFilter } = useAppStore();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                India&apos;s #1 Verified Home Services Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Find Trusted &amp; Verified{' '}
                <span className="text-primary">Domestic Workers</span>{' '}
                for Your Home
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                No more relying on word-of-mouth. Hire Aadhaar-verified, police-checked domestic helpers 
                with transparent ratings, fair salary guidance, and guaranteed replacements across 15+ Indian cities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  onClick={() => setView('browse')}
                >
                  Find Workers <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => setView('for-workers')}
                >
                  Register as Worker
                </Button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-5 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cities We Serve - Marquee */}
      <section className="border-y bg-card py-3 overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[...CITIES, ...CITIES, ...CITIES].map((city, i) => (
            <span key={`${city}-${i}`} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary/60" />
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Service Categories */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Browse by Service Category</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            Choose from 10+ verified service categories. Every worker on our platform goes through a rigorous verification process.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
        >
          {roles.map((role) => (
            <motion.button
              key={role.key}
              variants={item}
              onClick={() => { setFilter('role', role.key); setView('browse'); }}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 sm:p-5 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary/10 text-xl sm:text-2xl group-hover:bg-primary/20 transition-colors">
                {ROLE_ICONS[role.key]}
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">{ROLE_LABELS[role.key]}</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Trust & Verification */}
      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Built on Trust &amp; Verification</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              We go beyond listings. Every feature is designed to build confidence between families and workers.
            </p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {trustFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="rounded-xl border bg-card p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Get a verified domestic worker in 3 simple steps
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { step: '1', title: 'Search & Filter', desc: 'Browse verified workers by role, city, experience, salary, and language. Use AI-powered recommendations for the best match.' },
            { step: '2', title: 'Connect & Interview', desc: 'Chat or call directly. Schedule interviews. Check verified documents, ratings, and work history before deciding.' },
            { step: '3', title: 'Hire & Manage', desc: 'Sign a digital contract, track attendance, manage salary payments, and get replacement guarantee if needed.' },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                {s.step}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Trusted by Thousands of Families</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              Real stories from families who found reliable domestic help through GharSeva.
            </p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              { name: 'Anjali Mehta', location: 'Mumbai, Andheri', role: 'Housemaid', quote: 'We were skeptical about hiring online, but GharSeva\'s verification process gave us confidence. Sunita has been with us for 8 months now and she\'s like family. The attendance tracking feature is a game-changer.', rating: 5 },
              { name: 'Rahul Verma', location: 'Delhi, Saket', role: 'Babysitter', quote: 'Finding a trustworthy babysitter for our 2-year-old was stressful. GharSeva matched us with Geeta who is patient, caring, and CPR certified. The digital contract gave us legal clarity we never had before.', rating: 5 },
              { name: 'Revathi Krishnan', location: 'Chennai, Adyar', role: 'Cook', quote: 'Lakshmi from GharSeva is an incredible cook. The salary estimator helped us agree on fair pay upfront — no awkward negotiations. The review system keeps everyone accountable and professional.', rating: 5 },
              { name: 'Amit Patel', location: 'Bangalore, Whitefield', role: 'Driver', quote: 'Our corporate driver Ram Singh is always on time and knows every route in Bangalore. The police verification and Aadhaar check gave us complete peace of mind before hiring.', rating: 4 },
              { name: 'Sunita Jha', location: 'Pune, Kothrud', role: 'Elderly Caregiver', quote: 'We needed someone experienced for my 80-year-old father. Shanti Bai from GharSeva has been a blessing — she handles his medication, physiotherapy support, and keeps him cheerful.', rating: 5 },
              { name: 'Fatima Khan', location: 'Hyderabad, Banjara Hills', role: 'Gardener', quote: 'Venkatesh transformed our garden completely. His knowledge of seasonal plants and irrigation systems is remarkable. The platform made it easy to find such specialized talent.', rating: 5 },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={item}
                className="rounded-xl border bg-card p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location} &bull; Hired {t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expansion Services - Coming Soon */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Coming Soon</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">Expanding Into a Full Home Services Ecosystem</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            Once our core platform gains traction, we&apos;re adding these high-demand services to create a one-stop solution for all home needs.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { icon: '🔧', label: 'Appliance Repair' },
            { icon: '⚡', label: 'Electricians' },
            { icon: '🚿', label: 'Plumbers' },
            { icon: '🚗', label: 'Car Washing' },
            { icon: '🐛', label: 'Pest Control' },
            { icon: '✨', label: 'Deep Cleaning' },
            { icon: '🏥', label: 'Home Nursing' },
            { icon: '🐾', label: 'Pet Care' },
            { icon: '📚', label: 'Tutors' },
          ].map((service) => (
            <motion.div
              key={service.label}
              variants={item}
              className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-4 sm:p-5 opacity-75 hover:opacity-100 transition-opacity"
            >
              <span className="text-2xl sm:text-3xl">{service.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-center">{service.label}</span>
              <Badge variant="outline" className="text-[10px] text-muted-foreground">Coming Soon</Badge>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Competitive Advantage */}
      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Why GharSeva Wins</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              Many platforms focus on urban, premium services. We&apos;re different.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: 'Fast Verification', desc: 'Complete Aadhaar + police verification in under 48 hours, not weeks. Our streamlined process respects everyone\'s time.' },
              { title: 'Reliable Replacements', desc: 'If a worker doesn\'t work out, we guarantee a replacement within 48 hours — no questions asked, no extra charges.' },
              { title: 'Transparent Salary Guidance', desc: 'AI-powered salary estimator based on city, role, and experience ensures fair pay for workers and budget clarity for families.' },
              { title: 'Worker Skill Development', desc: 'Free training courses in housekeeping, childcare, elderly care, and cooking help workers grow their careers and earning potential.' },
              { title: 'Local Language Support', desc: 'Break language barriers with our built-in translator supporting Hindi, Tamil, Telugu, Bengali, and 10+ Indian languages.' },
              { title: 'Digital Employment Records', desc: 'Workers build a verified, portable work history — ratings, attendance, certificates — that follows them across jobs.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold mb-0.5">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Hire a Trusted Worker?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm sm:text-base">
            Join 10,000+ families who trust GharSeva for their domestic help needs. Start browsing verified workers today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={() => setView('browse')}
          >
            Browse Workers <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}