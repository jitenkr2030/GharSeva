'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search, SlidersHorizontal, Star, MapPin, Clock, ShieldCheck, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { ROLE_LABELS, ROLE_ICONS, CITIES, type WorkerProfile } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}</span>
    </div>
  );
}

function WorkerCard({ worker, onSelect }: { worker: WorkerProfile; onSelect: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all group overflow-hidden"
        onClick={onSelect}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-3 sm:gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl sm:text-2xl font-semibold text-primary border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                {worker.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{worker.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{ROLE_LABELS[worker.role] || worker.role}</p>
                </div>
                {worker.isPremium && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-yellow-50 text-yellow-700 border-yellow-200 flex-shrink-0">
                    Premium
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {worker.city}{worker.locality ? `, ${worker.locality}` : ''}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {worker.experienceYears}yr exp
                </span>
                <span className="capitalize">
                  {worker.availabilityType.replace('-', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2.5">
                <StarRating rating={worker.rating} />
                <span className="text-xs text-muted-foreground">({worker.reviewCount} reviews)</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {(worker.aadhaarVerified || worker.policeVerified) && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-300 text-green-700">
                    <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />
                    {worker.aadhaarVerified && worker.policeVerified ? 'Fully Verified' : 'Verified'}
                  </Badge>
                )}
                {worker.salaryExpectation && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    ₹{worker.salaryExpectation.toLocaleString('en-IN')}/mo
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function BrowseWorkers() {
  const {
    filters, setFilter, searchQuery, setSearchQuery,
    selectWorker, setView, setDemoMode,
  } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.role !== 'all') params.set('role', filters.role);
    if (filters.city !== 'all') params.set('city', filters.city);
    if (filters.availabilityType !== 'all') params.set('availabilityType', filters.availabilityType);
    if (filters.verifiedOnly) params.set('verifiedOnly', 'true');
    if (filters.ratingMin > 0) params.set('ratingMin', String(filters.ratingMin));
    if (filters.salaryMin > 0) params.set('salaryMin', String(filters.salaryMin));
    if (filters.salaryMax < 999999) params.set('salaryMax', String(filters.salaryMax));
    params.set('sortBy', filters.sortBy);
    if (searchQuery) params.set('search', searchQuery);
    params.set('page', String(page));
    params.set('limit', '12');
    return params.toString();
  }, [filters, searchQuery, page]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['workers', buildQueryParams()],
    queryFn: () => fetch(`/api/workers?${buildQueryParams()}`).then(r => r.json()),
  });

  const workers: WorkerProfile[] = data?.workers || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  const activeFilterCount = [
    filters.role !== 'all',
    filters.city !== 'all',
    filters.availabilityType !== 'all',
    filters.verifiedOnly,
    filters.ratingMin > 0,
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Find Verified Workers</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse {total.toLocaleString('en-IN')}+ verified domestic workers across India
        </p>
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, locality, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          className="gap-2 flex-shrink-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Card className="mb-4">
              <CardContent className="p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
                    <Select value={filters.role} onValueChange={(v) => setFilter('role', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {Object.entries(ROLE_LABELS).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">City</label>
                    <Select value={filters.city} onValueChange={(v) => setFilter('city', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Availability</label>
                    <Select value={filters.availabilityType} onValueChange={(v) => setFilter('availabilityType', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="live-in">Live-in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(v) => setFilter('sortBy', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="experience">Most Experienced</SelectItem>
                        <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                        <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="verified"
                      checked={filters.verifiedOnly}
                      onCheckedChange={(v) => setFilter('verifiedOnly', !!v)}
                    />
                    <label htmlFor="verified" className="text-sm flex items-center gap-1 cursor-pointer">
                      <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                      Fully verified only
                    </label>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => useAppStore.getState().resetFilters()}>
                    Clear all
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && !showFilters && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {filters.role !== 'all' && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {ROLE_LABELS[filters.role]} <button onClick={() => setFilter('role', 'all')}><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {filters.city !== 'all' && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {filters.city} <button onClick={() => setFilter('city', 'all')}><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {filters.verifiedOnly && (
            <Badge variant="secondary" className="gap-1 text-xs border-green-300 text-green-700">
              Verified <button onClick={() => setFilter('verifiedOnly', false)}><X className="h-3 w-3" /></button>
            </Badge>
          )}
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><div className="flex gap-4"><Skeleton className="h-16 w-16 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-3 w-60" /><Skeleton className="h-3 w-32" /></div></div></CardContent></Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Failed to load workers. Please try again.</p>
          <Button variant="outline" className="mt-3" onClick={() => setView('home')}>Go Back</Button>
        </Card>
      ) : workers.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-2">No workers found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
        </Card>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-3">
            Showing {workers.length} of {total} workers
          </p>
          <div className="grid gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {workers.map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker as unknown as WorkerProfile}
                  onSelect={() => selectWorker(worker.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-3">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}