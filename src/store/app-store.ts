import { create } from 'zustand';
import type { AppView, FilterState } from '@/types';

interface AppState {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;
  previousView: AppView | null;

  // Selected worker for detail view
  selectedWorkerId: string | null;
  selectWorker: (id: string | null) => void;

  // Filters
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string | number | boolean) => void;
  resetFilters: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Booking modal
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;

  // Registration modal
  registrationModalOpen: boolean;
  setRegistrationModalOpen: (open: boolean) => void;

  // Demo mode
  demoMode: 'family' | 'worker' | null;
  setDemoMode: (mode: 'family' | 'worker' | null) => void;
}

const defaultFilters: FilterState = {
  role: 'all',
  city: 'all',
  availabilityType: 'all',
  salaryMin: 0,
  salaryMax: 999999,
  verifiedOnly: false,
  ratingMin: 0,
  sortBy: 'rating',
};

export const useAppStore = create<AppState>((set) => ({
  currentView: 'home',
  setView: (view) =>
    set((state) => ({
      previousView: state.currentView,
      currentView: view,
      mobileMenuOpen: false,
    })),
  previousView: null,

  selectedWorkerId: null,
  selectWorker: (id) =>
    set((state) => ({
      selectedWorkerId: id,
      currentView: id ? 'worker-detail' : (state.previousView || 'browse'),
    })),

  filters: { ...defaultFilters },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  bookingModalOpen: false,
  setBookingModalOpen: (open) => set({ bookingModalOpen: open }),

  registrationModalOpen: false,
  setRegistrationModalOpen: (open) => set({ registrationModalOpen: open }),

  demoMode: null,
  setDemoMode: (mode) => set({ demoMode: mode }),
}));