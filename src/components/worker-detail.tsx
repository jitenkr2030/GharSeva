'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  ArrowLeft, Star, MapPin, Clock, ShieldCheck, Phone, Mail, Calendar,
  MessageCircle, Award, Briefcase, Globe, Heart, CheckCircle2,
} from 'lucide-react';
import { ROLE_LABELS, ROLE_ICONS, CITIES, INDIAN_LANGUAGES, type WorkerProfile } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
      ))}
      {size === 'lg' && <span className="ml-1.5 text-sm font-medium">{rating.toFixed(1)}</span>}
    </div>
  );
}

export default function WorkerDetail() {
  const { selectedWorkerId, selectWorker, setDemoMode, setBookingModalOpen } = useAppStore();
  const queryClient = useQueryClient();
  const [bookingForm, setBookingForm] = useState({ notes: '', startDate: '' });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const { data: worker, isLoading } = useQuery({
    queryKey: ['worker', selectedWorkerId],
    queryFn: () => fetch(`/api/workers/${selectedWorkerId}`).then(r => r.json()),
    enabled: !!selectedWorkerId,
  });

  const reviewMutation = useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: selectedWorkerId,
          employerId: 'demo-employer-1',
          ...data,
        }),
      }).then(r => r.json()),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['worker', selectedWorkerId] });
      setReviewForm({ rating: 5, comment: '' });
    },
    onError: () => toast.error('Failed to submit review'),
  });

  const bookingMutation = useMutation({
    mutationFn: (data: { notes: string; startDate: string }) =>
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: selectedWorkerId,
          employerId: 'demo-employer-1',
          startDate: data.startDate,
          notes: data.notes,
          salary: worker?.salaryExpectation,
        }),
      }).then(r => r.json()),
    onSuccess: () => {
      toast.success('Booking request sent! The worker will be notified.');
      setShowBookingDialog(false);
      setBookingForm({ notes: '', startDate: '' });
    },
    onError: () => toast.error('Failed to send booking request'),
  });

  if (!selectedWorkerId) return null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-40 bg-muted rounded" />
        </div>
      </div>
    );
  }

  const w = worker as unknown as WorkerProfile;
  const reviews = w.reviews || [];
  const languages = typeof w.languages === 'string' ? JSON.parse(w.languages) : w.languages;
  const skills = typeof w.skills === 'string' ? JSON.parse(w.skills) : w.skills;
  const roles = typeof w.roles === 'string' ? JSON.parse(w.roles) : w.roles;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => selectWorker(null)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to results
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Profile */}
        <div className="lg:col-span-2 space-y-5">
          {/* Profile Header Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary border-2 border-primary/20">
                      {w.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-xl sm:text-2xl font-bold">{w.name}</h1>
                          {w.isPremium && (
                            <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">Premium</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mt-0.5">
                          {ROLE_LABELS[w.role] || w.role} &bull; {w.gender} &bull; {w.age ? `${w.age} years` : 'Age not specified'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                          <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
                              <Calendar className="h-4 w-4" /> Book Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Book {w.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-2">
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Preferred Start Date</label>
                                <Input
                                  type="date"
                                  value={bookingForm.startDate}
                                  onChange={(e) => setBookingForm(f => ({ ...f, startDate: e.target.value }))}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1.5 block">Notes for the worker</label>
                                <Textarea
                                  placeholder="E.g., Need someone who can cook both North and South Indian food..."
                                  value={bookingForm.notes}
                                  onChange={(e) => setBookingForm(f => ({ ...f, notes: e.target.value }))}
                                  rows={3}
                                />
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Expected salary: <span className="font-medium text-foreground">₹{w.salaryExpectation?.toLocaleString('en-IN')}/month</span>
                              </div>
                              <Button
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                disabled={bookingMutation.isPending || !bookingForm.startDate}
                                onClick={() => bookingMutation.mutate(bookingForm)}
                              >
                                {bookingMutation.isPending ? 'Sending...' : 'Send Booking Request'}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{w.city}{w.locality ? `, ${w.locality}` : ''}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{w.experienceYears} years experience</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{w.availabilityType.replace('-', ' ')}</span>
                    </div>

                    <StarRating rating={w.rating} size="lg" />
                    <p className="text-xs text-muted-foreground">{w.reviewCount} reviews from verified employers</p>

                    <div className="flex flex-wrap gap-2">
                      {w.aadhaarVerified && (
                        <Badge variant="outline" className="border-green-300 text-green-700 gap-1"><ShieldCheck className="h-3 w-3" />Aadhaar Verified</Badge>
                      )}
                      {w.policeVerified && (
                        <Badge variant="outline" className="border-green-300 text-green-700 gap-1"><ShieldCheck className="h-3 w-3" />Police Verified</Badge>
                      )}
                      {w.salaryExpectation && (
                        <Badge variant="secondary">₹{w.salaryExpectation.toLocaleString('en-IN')}/month</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* About */}
          {w.about && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">About</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.about}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills & Languages */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Skills & Languages</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s: string) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Languages</h4>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l: string) => (
                    <Badge key={l} variant="outline" className="gap-1 text-xs"><Globe className="h-2.5 w-2.5" />{l}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Reviews ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((r: { id: string; rating: number; comment?: string; createdAt: string }) => (
                  <div key={r.id} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <StarRating rating={r.rating} />
                      <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                    {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                  </div>
                ))}
              </div>

              {/* Add Review */}
              <Separator className="my-4" />
              <h4 className="text-sm font-medium mb-2">Write a Review</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button key={i} onClick={() => setReviewForm(f => ({ ...f, rating: i }))}>
                      <Star className={`h-5 w-5 ${i <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'} hover:fill-yellow-300 transition-colors`} />
                    </button>
                  ))}
                </div>
                <Textarea
                  placeholder="Share your experience..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                  rows={2}
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={reviewMutation.isPending}
                  onClick={() => reviewMutation.mutate(reviewForm)}
                >
                  {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={() => setShowBookingDialog(true)}>
                <Calendar className="h-4 w-4" /> Book Now
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MessageCircle className="h-4 w-4" /> Chat
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h4 className="font-semibold text-sm">Quick Info</h4>
              {[
                { icon: MapPin, label: 'Location', value: `${w.city}${w.locality ? `, ${w.locality}` : ''}` },
                { icon: Clock, label: 'Experience', value: `${w.experienceYears} years` },
                { icon: Briefcase, label: 'Availability', value: w.availabilityType.replace('-', ' ') },
                { icon: Award, label: 'Rating', value: `${w.rating}/5.0` },
                { icon: CheckCircle2, label: 'Reviews', value: `${w.reviewCount} verified` },
              ].map((info) => (
                <div key={info.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <info.icon className="h-3.5 w-3.5" />{info.label}
                  </span>
                  <span className="font-medium">{info.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Safety Tips
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                <li className="flex gap-1.5"><span className="text-primary">&#8226;</span> Always meet in person before finalizing</li>
                <li className="flex gap-1.5"><span className="text-primary">&#8226;</span> Verify original documents</li>
                <li className="flex gap-1.5"><span className="text-primary">&#8226;</span> Start with a 7-day trial period</li>
                <li className="flex gap-1.5"><span className="text-primary">&#8226;</span> Use our digital contract feature</li>
                <li className="flex gap-1.5"><span className="text-primary">&#8226;</span> Report any concerns immediately</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}