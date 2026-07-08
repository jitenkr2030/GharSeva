'use client';

import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Get started with basic features',
    features: [
      { text: 'Browse verified worker profiles', included: true },
      { text: 'View ratings and reviews', included: true },
      { text: 'Contact up to 3 workers/month', included: true },
      { text: 'Basic search filters', included: true },
      { text: 'Replacement guarantee', included: false },
      { text: 'Digital contracts', included: false },
      { text: 'Priority support', included: false },
      { text: 'Dedicated relationship manager', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Basic',
    price: '₹199',
    period: '/month',
    desc: 'For families who need regular help',
    features: [
      { text: 'Browse verified worker profiles', included: true },
      { text: 'View ratings and reviews', included: true },
      { text: 'Contact up to 15 workers/month', included: true },
      { text: 'Advanced search & filters', included: true },
      { text: '1 replacement per quarter', included: true },
      { text: 'Digital contracts', included: true },
      { text: 'Priority support', included: false },
      { text: 'Dedicated relationship manager', included: false },
    ],
    cta: 'Subscribe Now',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹499',
    period: '/month',
    desc: 'Best value for active households',
    features: [
      { text: 'Browse verified worker profiles', included: true },
      { text: 'View ratings and reviews', included: true },
      { text: 'Unlimited worker contacts', included: true },
      { text: 'AI-powered recommendations', included: true },
      { text: 'Unlimited replacements', included: true },
      { text: 'Digital contracts & attendance', included: true },
      { text: 'Priority support (24/7)', included: true },
      { text: 'Dedicated relationship manager', included: false },
    ],
    cta: 'Go Premium',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹999',
    period: '/month',
    desc: 'For large households & employers',
    features: [
      { text: 'Everything in Premium', included: true },
      { text: 'Multi-property management', included: true },
      { text: 'Payroll & compliance tools', included: true },
      { text: 'Custom hiring workflows', included: true },
      { text: 'Express verification (24hr)', included: true },
      { text: 'Legal consultation', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Dedicated relationship manager', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const additionalServices = [
  { name: 'One-time Placement Fee', price: '₹999', desc: 'Charged after a successful hire through the platform. Covers verification and matching costs.' },
  { name: 'Premium Worker Profile', price: '₹49/month', desc: 'Workers can boost visibility with a verified badge and priority listing for better job opportunities.' },
  { name: 'Training & Certification', price: 'Starting ₹299', desc: 'Professional courses in housekeeping, childcare, elderly care, hygiene, and regional cooking.' },
  { name: 'Payroll & Compliance', price: '₹299/month', desc: 'Digital salary records, automated leave tracking, payment receipts, and PF/ESI compliance support.' },
];

export default function PricingSection() {
  const { setView } = useAppStore();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-10">
        <Badge variant="secondary" className="mb-3">Pricing</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Choose the plan that fits your household needs. Upgrade or downgrade anytime. No hidden charges.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{plan.desc}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm">
                      {f.included ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? '' : 'text-muted-foreground/60'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-5 ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => setView('browse')}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Services */}
      <div>
        <h2 className="text-xl font-bold text-center mb-6">Additional Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalServices.map((s) => (
            <Card key={s.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold text-sm">{s.name}</h3>
                <p className="text-lg font-bold text-primary mt-1">{s.price}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ-ish CTA */}
      <div className="mt-12 rounded-xl bg-muted/40 p-6 sm:p-8 text-center space-y-3">
        <h2 className="text-xl font-bold">Need a Custom Plan?</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          If you&apos;re a housing society, corporate office, or have multiple properties, we can create a custom plan tailored to your needs.
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          Contact Sales <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}