'use client';

import { useTheme } from 'next-themes';
import { useAppStore } from '@/store/app-store';
import { useAuth } from '@/hooks/use-auth';
import AuthModal from '@/components/auth/auth-modal';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Menu, Home, Search, Users, CreditCard, LayoutDashboard, Sparkles, Shield,
  Sun, Moon, LogIn, LogOut, UserCircle, Settings, ChevronDown,
} from 'lucide-react';

const navItems = [
  { view: 'home' as const, label: 'Home', icon: Home },
  { view: 'browse' as const, label: 'Find Workers', icon: Search },
  { view: 'for-workers' as const, label: 'For Workers', icon: Users },
  { view: 'pricing' as const, label: 'Pricing', icon: CreditCard },
  { view: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { view: 'ai-tools' as const, label: 'AI Tools', icon: Sparkles },
];

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  employer: 'Family',
  worker: 'Worker',
};

function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Button
        size="sm"
        className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        onClick={() => useAppStore.getState().setAuthModalOpen(true)}
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const role = (user.role as string) || 'employer';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image || undefined} alt={user.name || ''} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
            <Badge variant="secondary" className="w-fit mt-1 text-[10px]">
              {roleLabels[role] || role}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => useAppStore.getState().setView('dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const { currentView, setView, mobileMenuOpen, setMobileMenuOpen, setDemoMode } = useAppStore();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <button
            onClick={() => { setView('home'); setDemoMode(null); }}
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">GharSeva</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === item.view
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Auth + Dark Mode + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:inline-flex"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {!isAuthenticated && (
              <Button
                size="sm"
                className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={() => setView('browse')}
              >
                Hire Now
              </Button>
            )}

            <div className="hidden lg:block">
              <UserMenu />
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2 mb-6">
                  <Shield className="h-5 w-5 text-primary" />
                  GharSeva
                </SheetTitle>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.view}
                      onClick={() => setView(item.view)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                        currentView === item.view
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                  <div className="mt-4 px-3 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                      <Sun className="h-4 w-4 dark:hidden" />
                      <Moon className="h-4 w-4 hidden dark:inline" />
                      <span className="dark:hidden">Dark Mode</span>
                      <span className="hidden dark:inline">Light Mode</span>
                    </Button>
                    {!isAuthenticated && (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setView('browse')}
                      >
                        Hire Now
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
}