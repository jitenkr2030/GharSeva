'use client';

import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, Search, Star, Users, ArrowRight, CheckCircle2,
  Home, ChefHat, Baby, HeartPulse, Car, ShieldCheck, TreePine, Sparkles, Shirt, Building,
} from 'lucide-react';
import { ROLE_LABELS, ROLE_ICONS } from '@/types';
import { motion } from 'framer-motion';

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