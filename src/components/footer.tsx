'use client';

import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              GharSeva
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India&apos;s verified home services workforce platform. Connecting trusted domestic workers with families across 15+ cities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Housemaids & Cleaners</li>
              <li>Cooks & Kitchen Help</li>
              <li>Babysitters & Nannies</li>
              <li>Elderly Caregivers</li>
              <li>Drivers & Security</li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>How It Works</li>
              <li>Safety & Trust</li>
              <li>Partner With Us</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                1800-123-4567 (Toll Free)
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                support@gharseva.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5" />
                Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and 10+ more cities
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; 2025 GharSeva. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}