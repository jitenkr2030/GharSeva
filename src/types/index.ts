export type WorkerRole = 
  | 'housemaid' 
  | 'cook' 
  | 'babysitter' 
  | 'elderly_caregiver' 
  | 'driver' 
  | 'security_guard' 
  | 'gardener' 
  | 'cleaner' 
  | 'laundry_helper' 
  | 'home_attendant';

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age?: number;
  gender: string;
  profileImage?: string;
  role: string;
  roles: string[];
  city: string;
  locality?: string;
  pincode?: string;
  experienceYears: number;
  salaryExpectation?: number;
  availabilityType: string;
  languages: string[];
  skills: string[];
  about?: string;
  aadhaarVerified: boolean;
  policeVerified: boolean;
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  isAvailable: boolean;
  createdAt: string;
  reviews?: ReviewData[];
}

export interface EmployerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  locality?: string;
  plan: string;
}

export interface BookingData {
  id: string;
  workerId: string;
  employerId: string;
  status: string;
  startDate: string;
  endDate?: string;
  salary?: number;
  notes?: string;
  worker?: WorkerProfile;
  employer?: EmployerProfile;
}

export interface ReviewData {
  id: string;
  workerId: string;
  employerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface AttendanceData {
  id: string;
  workerId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  notes?: string;
}

export interface SalaryRecordData {
  id: string;
  workerId: string;
  month: string;
  amount: number;
  paidOn?: string;
  status: string;
}

export interface JobApplicationData {
  id: string;
  workerId: string;
  jobTitle: string;
  employerName?: string;
  city: string;
  salary?: number;
  status: string;
  appliedAt: string;
}

export type AppView = 
  | 'home' 
  | 'browse' 
  | 'worker-detail' 
  | 'for-workers' 
  | 'pricing' 
  | 'dashboard' 
  | 'ai-tools';

export interface FilterState {
  role: string;
  city: string;
  availabilityType: string;
  salaryMin: number;
  salaryMax: number;
  verifiedOnly: boolean;
  ratingMin: number;
  sortBy: string;
}

export const ROLE_LABELS: Record<string, string> = {
  housemaid: 'Housemaid',
  cook: 'Cook',
  babysitter: 'Babysitter / Nanny',
  elderly_caregiver: 'Elderly Caregiver',
  driver: 'Driver',
  security_guard: 'Security Guard',
  gardener: 'Gardener',
  cleaner: 'Cleaner',
  laundry_helper: 'Laundry / Ironing',
  home_attendant: 'Home Attendant',
};

export const ROLE_ICONS: Record<string, string> = {
  housemaid: '🏠',
  cook: '🍳',
  babysitter: '👶',
  elderly_caregiver: '🩺',
  driver: '🚗',
  security_guard: '🛡️',
  gardener: '🌿',
  cleaner: '🧹',
  laundry_helper: '👔',
  home_attendant: '🏡',
};

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Bhopal', 'Patna', 'Nagpur'
];

export const INDIAN_LANGUAGES = [
  'Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 
  'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi',
  'Urdu', 'Odia', 'Assamese', 'Rajasthani'
];