'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles, Calculator, Languages, Lightbulb, TrendingUp,
  CheckCircle2, ArrowRight, AlertCircle,
} from 'lucide-react';
import { ROLE_LABELS, CITIES } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function AIToolsSection() {
  const [salaryForm, setSalaryForm] = useState({ city: 'Mumbai', role: 'housemaid', experience: 5, availability: 'full-time' });
  const [translateForm, setTranslateForm] = useState({ text: 'when can you start', from: 'en', to: 'hi' });
  const [recommendForm, setRecommendForm] = useState({ role: 'housemaid', city: 'Mumbai', maxSalary: 15000, minRating: 4.0 });

  const { data: salaryData, isLoading: salaryLoading } = useQuery({
    queryKey: ['ai-salary', salaryForm],
    queryFn: () => fetch(`/api/ai?type=salary-estimate&city=${salaryForm.city}&role=${salaryForm.role}&experience=${salaryForm.experience}&availability=${salaryForm.availability}`).then(r => r.json()),
    enabled: true,
  });

  const [recResult, setRecResult] = useState<string | null>(null);
  const [recLoading, setRecLoading] = useState(false);

  const fetchRecommendation = useCallback(async () => {
    setRecLoading(true);
    try {
      const res = await fetch(`/api/ai?type=recommend&role=${recommendForm.role}&city=${recommendForm.city}&maxSalary=${recommendForm.maxSalary}&minRating=${recommendForm.minRating}`);
      const data = await res.json();
      setRecResult(data.recommendation);
    } catch { setRecResult('Failed to get recommendations.'); }
    setRecLoading(false);
  }, [recommendForm]);

  const { data: translateData, isLoading: transLoading, refetch: refetchTranslate } = useQuery({
    queryKey: ['ai-translate', translateForm],
    queryFn: () => fetch(`/api/ai?type=translate&text=${encodeURIComponent(translateForm.text)}&from=${translateForm.from}&to=${translateForm.to}`).then(r => r.json()),
    enabled: false,
  });

  const translationExamples = [
    { text: 'hello', label: 'Hello' },
    { text: 'when can you start', label: 'When can you start?' },
    { text: 'what is your salary expectation', label: 'Salary expectation?' },
    { text: 'thank you', label: 'Thank you' },
    { text: 'i need help with cooking', label: 'Need cooking help' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="text-center mb-10">
        <Badge variant="secondary" className="mb-3 gap-1">
          <Sparkles className="h-3 w-3" /> AI-Powered Tools
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold">Smart Tools for Smarter Hiring</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Leverage AI to estimate fair salaries, get personalized recommendations, and break language barriers.
        </p>
      </div>

      <Tabs defaultValue="salary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          <TabsTrigger value="salary" className="text-xs sm:text-sm py-2"><Calculator className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Salary Estimator</TabsTrigger>
          <TabsTrigger value="recommend" className="text-xs sm:text-sm py-2"><Lightbulb className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Recommendations</TabsTrigger>
          <TabsTrigger value="translate" className="text-xs sm:text-sm py-2"><Languages className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Language Translate</TabsTrigger>
        </TabsList>

        {/* Salary Estimator */}
        <TabsContent value="salary">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" /> Fair Salary Estimator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">City</label>
                  <Select value={salaryForm.city} onValueChange={(v) => setSalaryForm(f => ({ ...f, city: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Role</label>
                  <Select value={salaryForm.role} onValueChange={(v) => setSalaryForm(f => ({ ...f, role: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(ROLE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Experience (years)</label>
                    <Input type="number" value={salaryForm.experience} onChange={(e) => setSalaryForm(f => ({ ...f, experience: parseInt(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Availability</label>
                    <Select value={salaryForm.availability} onValueChange={(v) => setSalaryForm(f => ({ ...f, availability: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="live-in">Live-in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Estimated Salary Range</CardTitle>
              </CardHeader>
              <CardContent>
                {salaryLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-8 bg-muted rounded" />
                    <div className="h-20 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                ) : salaryData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-xs text-muted-foreground">Minimum</p>
                        <p className="text-lg font-bold text-green-700">₹{salaryData.salaryRange.min.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-muted-foreground">Median</p>
                        <p className="text-lg font-bold text-primary">₹{salaryData.median.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                        <p className="text-xs text-muted-foreground">Maximum</p>
                        <p className="text-lg font-bold text-orange-700">₹{salaryData.salaryRange.max.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">{salaryData.recommendation}</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <p>Estimates are based on market data and may vary based on specific skills, locality within the city, and negotiation. Actual salaries should be discussed directly with the worker.</p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations */}
        <TabsContent value="recommend">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" /> AI Worker Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">What do you need?</label>
                  <Select value={recommendForm.role} onValueChange={(v) => setRecommendForm(f => ({ ...f, role: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(ROLE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">City</label>
                  <Select value={recommendForm.city} onValueChange={(v) => setRecommendForm(f => ({ ...f, city: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Max Budget (₹/mo)</label>
                    <Input type="number" value={recommendForm.maxSalary} onChange={(e) => setRecommendForm(f => ({ ...f, maxSalary: parseInt(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Min Rating</label>
                    <Input type="number" step="0.1" value={recommendForm.minRating} onChange={(e) => setRecommendForm(f => ({ ...f, minRating: parseFloat(e.target.value) || 0 }))} />
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={fetchRecommendation} disabled={recLoading}>
                  {recLoading ? 'Analyzing...' : 'Get Recommendations'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recommendation Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {recResult || `Based on your preferences, we recommend looking for ${ROLE_LABELS[recommendForm.role]}s in ${recommendForm.city} with ratings above ${recommendForm.minRating} and salary expectations within ₹${recommendForm.maxSalary.toLocaleString('en-IN')}/month.`}
                    </p>
                  </div>
                  <h4 className="text-sm font-medium">Hiring Tips</h4>
                  <ul className="space-y-2">
                    {[
                      'Always verify documents in person before finalizing',
                      'Start with a 7-day trial period',
                      'Discuss work hours and holidays clearly upfront',
                      'Check references from previous employers',
                      'Use our digital contract feature for clarity',
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Language Translate */}
        <TabsContent value="translate">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Languages className="h-4 w-4 text-primary" /> Conversation Translator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Select value={translateForm.from} onValueChange={(v) => setTranslateForm(f => ({ ...f, from: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={translateForm.to} onValueChange={(v) => setTranslateForm(f => ({ ...f, to: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Text to translate</label>
                  <Textarea
                    value={translateForm.text}
                    onChange={(e) => setTranslateForm(f => ({ ...f, text: e.target.value }))}
                    placeholder="Type or select a common phrase..."
                    rows={3}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {translationExamples.map((ex) => (
                    <Badge
                      key={ex.text}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors text-xs"
                      onClick={() => setTranslateForm(f => ({ ...f, text: ex.text }))}
                    >
                      {ex.label}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => refetchTranslate()}
                  disabled={transLoading}
                >
                  {transLoading ? 'Translating...' : 'Translate'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Translation Result</CardTitle>
              </CardHeader>
              <CardContent>
                {translateData ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Original ({translateData.from})</p>
                      <p className="text-sm font-medium">{translateData.original}</p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Translated ({translateData.to})</p>
                      <p className="text-lg font-semibold text-primary">{translateData.translated}</p>
                    </div>
                    {translateData.note && (
                      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        {translateData.note}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Languages className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Enter text and click Translate to see the result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Features Showcase */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Lightbulb, title: 'Smart Matching', desc: 'AI recommends the best worker based on your family preferences, location, and budget constraints.' },
          { icon: TrendingUp, title: 'Fraud Detection', desc: 'Machine learning models detect suspicious profiles, fake reviews, and potential fraud before it affects you.' },
          { icon: Languages, title: 'Voice Applications', desc: 'Workers can apply for jobs using voice commands in their preferred language, removing the typing barrier.' },
          { icon: Calculator, title: 'Salary Intelligence', desc: 'Real-time salary benchmarking across cities and roles ensures fair compensation for both parties.' },
        ].map((feature) => (
          <Card key={feature.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 mb-3">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}