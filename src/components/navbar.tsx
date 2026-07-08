'use client';

import Link from 'next/link';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  Menu, Home, Search, Users, CreditCard, LayoutDashboard, Sparkles, Shield,
} from 'lucide-react';

const navItems = [
  { view: 'home' as const, label: 'Home', icon: Home },
  { view: 'browse' as const, label: 'Find Workers', icon: Search },
  { view: 'for-workers' as const, label: 'For Workers', icon: Users },
  { view: 'pricing' as const, label: 'Pricing', icon: CreditCard },
  { view: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { view: 'ai-tools' as const, label: 'AI Tools', icon: Sparkles },
];

export default function Navbar() {
  const { currentView, setView, mobileMenuOpen, setMobileMenuOpen, setDemoMode } = useAppStore();

  return (
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

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setView('browse')}
          >
            Hire Now
          </Button>
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
                <div className="mt-4 px-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setView('browse')}
                  >
                    Hire Now
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}