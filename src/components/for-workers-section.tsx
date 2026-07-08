'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UserPlus, Briefcase, GraduationCap, Award, Star, MapPin, Clock, CheckCircle2,
  Shield, FileText, BarChart3, Search, TrendingUp,
} from 'lucide-react';
import { ROLE_LABELS, ROLE_ICONS, CITIES, INDIAN_LANGUAGES } from '@/types';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const benefits = [
  { icon: UserPlus, title: 'Free Profile Creation', desc: 'Create your detailed professional profile with skills, experience, and languages at absolutely no cost. Your profile is visible to thousands of families across India.' },
  { icon: MapPin, title: 'Nearby Job Alerts', desc: 'Receive instant notifications for job openings in your locality and preferred areas. No more searching through unreliable word-of-mouth networks.' },
  { icon: Shield, title: 'Digital ID Card', desc: 'Get a verified digital identity card that builds your professional credibility and helps employers trust your background and skills.' },
  { icon: Star, title: 'Skill Certificates', desc: 'Earn certificates by completing our training courses in housekeeping, childcare, elderly care, hygiene, and cooking specialties.' },
  { icon: BarChart3, title: 'Earnings Dashboard', desc: 'Track your salary records, attendance history, and leave calendar in one place. Build a verified employment record over time.' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Access training videos, skill development courses, and premium profile options to grow your career and increase your earning potential.' },
];

const jobListings = [
  { id: '1', title: 'Housemaid needed in Andheri West', employer: 'Priya Sharma', city: 'Mumbai', salary: 12000, type: 'full-time', posted: '2 hours ago' },
  { id: '2', title: 'Cook for family of 5 in Koramangala', employer: 'Anita Desai', city: 'Bangalore', salary: 15000, type: 'full-time', posted: '5 hours ago' },
  { id: '3', title: 'Part-time babysitter in Saket', employer: 'Rajesh Gupta', city: 'Delhi', salary: 8000, type: 'part-time', posted: '1 day ago' },
  { id: '4', title: 'Live-in elderly caregiver', employer: 'Vikram Patel', city: 'Hyderabad', salary: 18000, type: 'live-in', posted: '1 day ago' },
  { id: '5', title: 'Morning cook & house help', employer: 'Meera Krishnan', city: 'Chennai', salary: 11000, type: 'part-time', posted: '2 days ago' },
  { id: '6', title: 'Driver for corporate executive', employer: 'TechCorp India', city: 'Pune', salary: 22000, type: 'full-time', posted: '3 days ago' },
];

const courses = [
  { title: 'Professional Housekeeping', duration: '4 weeks', icon: '🏠', skills: ['Deep cleaning techniques', 'Surface care', 'Organizing', 'Chemical safety'] },
  { title: 'Childcare & Safety', duration: '6 weeks', icon: '👶', skills: ['Infant care basics', 'First aid & CPR', 'Activity planning', 'Nutrition for kids'] },
  { title: 'Elderly Care Fundamentals', duration: '6 weeks', icon: '🩺', skills: ['Dementia awareness', 'Medication management', 'Mobility assistance', 'Emotional support'] },
  { title: 'Indian Cooking Mastery', duration: '8 weeks', icon: '🍳', skills: ['Regional cuisines', 'Diet cooking', 'Meal planning', 'Food safety & hygiene'] },
];

export default function ForWorkersSection() {
  const [regForm, setRegForm] = useState({
    name: '', phone: '', city: '', role: '', experienceYears: 0,
    salaryExpectation: 0, availabilityType: 'full-time', languages: [] as string[], skills: [] as string[],
    about: '', agreeTerms: false,
  });

  const handleSubmit = async () => {
    if (!regForm.name || !regForm.phone || !regForm.city || !regForm.role) {
      toast.error('Please fill all required fields');
      return;
    }
    if (!regForm.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    try {
      const res = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      });
      if (res.ok) {
        toast.success('Profile created successfully! Your profile will be reviewed and verified shortly.');
        setRegForm({ name: '', phone: '', city: '', role: '', experienceYears: 0, salaryExpectation: 0, availabilityType: 'full-time', languages: [], skills: [], about: '', agreeTerms: false });
      } else {
        toast.error('Failed to create profile. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="secondary" className="mb-3">For Domestic Workers</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold">Build Your Career with GharSeva</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Register for free, find nearby jobs, get verified, and build a trusted work history that helps you earn more.
        </p>
      </div>

      <Tabs defaultValue="benefits" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="benefits" className="text-xs sm:text-sm py-2"><Briefcase className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Benefits</TabsTrigger>
          <TabsTrigger value="jobs" className="text-xs sm:text-sm py-2"><Search className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Jobs</TabsTrigger>
          <TabsTrigger value="register" className="text-xs sm:text-sm py-2"><UserPlus className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Register</TabsTrigger>
          <TabsTrigger value="training" className="text-xs sm:text-sm py-2"><GraduationCap className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Training</TabsTrigger>
        </TabsList>

        {/* Benefits Tab */}
        <TabsContent value="benefits">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <Card key={b.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{jobListings.length} active job listings</p>
            {jobListings.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-sm sm:text-base">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{job.employer}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{job.city}</span>
                        <span>&bull;</span>
                        <span>₹{job.salary.toLocaleString('en-IN')}/mo</span>
                        <Badge variant="secondary" className="text-[10px] capitalize">{job.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{job.posted}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Create Your Worker Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                  <Input placeholder="Your full name" value={regForm.name} onChange={(e) => setRegForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone Number *</label>
                  <Input placeholder="10-digit mobile number" value={regForm.phone} onChange={(e) => setRegForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">City *</label>
                  <Select value={regForm.city} onValueChange={(v) => setRegForm(f => ({ ...f, city: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Primary Role *</label>
                  <Select value={regForm.role} onValueChange={(v) => setRegForm(f => ({ ...f, role: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(ROLE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Experience (years)</label>
                  <Input type="number" placeholder="0" value={regForm.experienceYears || ''} onChange={(e) => setRegForm(f => ({ ...f, experienceYears: parseInt(e.target.value) || 0 }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Expected Salary (₹/month)</label>
                  <Input type="number" placeholder="e.g. 12000" value={regForm.salaryExpectation || ''} onChange={(e) => setRegForm(f => ({ ...f, salaryExpectation: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Availability Type</label>
                  <Select value={regForm.availabilityType} onValueChange={(v) => setRegForm(f => ({ ...f, availabilityType: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="live-in">Live-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">About Yourself</label>
                  <Textarea placeholder="Tell employers about your experience, skills, and what makes you a great worker..." rows={3} value={regForm.about} onChange={(e) => setRegForm(f => ({ ...f, about: e.target.value }))} />
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <Checkbox id="terms" checked={regForm.agreeTerms} onCheckedChange={(v) => setRegForm(f => ({ ...f, agreeTerms: !!v }))} />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to GharSeva&apos;s terms of service and consent to identity verification. I understand my profile will be reviewed before going live.
                </label>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSubmit}>
                Create Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training">
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{course.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.duration}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">Free</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}