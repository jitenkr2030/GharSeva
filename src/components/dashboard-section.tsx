'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Calendar, Clock, DollarSign, BarChart3, User, CheckCircle2,
  AlertCircle, XCircle, Minus, FileText, Bell,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Demo attendance data
const attendanceData = [
  { date: '2025-06-30', status: 'present', checkIn: '07:30', checkOut: '18:00' },
  { date: '2025-06-29', status: 'present', checkIn: '07:45', checkOut: '17:50' },
  { date: '2025-06-28', status: 'present', checkIn: '07:30', checkOut: '18:10' },
  { date: '2025-06-27', status: 'half-day', checkIn: '08:00', checkOut: '13:00' },
  { date: '2025-06-26', status: 'present', checkIn: '07:30', checkOut: '18:00' },
  { date: '2025-06-25', status: 'present', checkIn: '07:35', checkOut: '17:55' },
  { date: '2025-06-24', status: 'leave', checkIn: null, checkOut: null },
  { date: '2025-06-23', status: 'present', checkIn: '07:30', checkOut: '18:00' },
  { date: '2025-06-22', status: 'present', checkIn: '07:40', checkOut: '17:45' },
  { date: '2025-06-21', status: 'present', checkIn: '07:30', checkOut: '18:05' },
  { date: '2025-06-20', status: 'absent', checkIn: null, checkOut: null },
  { date: '2025-06-19', status: 'present', checkIn: '07:30', checkOut: '18:00' },
  { date: '2025-06-18', status: 'present', checkIn: '07:35', checkOut: '18:10' },
  { date: '2025-06-17', status: 'leave', checkIn: null, checkOut: null },
];

const salaryRecords = [
  { month: 'Jun 2025', amount: 12000, status: 'pending', paidOn: null },
  { month: 'May 2025', amount: 12000, status: 'paid', paidOn: '2025-06-05' },
  { month: 'Apr 2025', amount: 12000, status: 'paid', paidOn: '2025-05-05' },
  { month: 'Mar 2025', amount: 12000, status: 'paid', paidOn: '2025-04-05' },
  { month: 'Feb 2025', amount: 11500, status: 'paid', paidOn: '2025-03-05' },
  { month: 'Jan 2025', amount: 11500, status: 'paid', paidOn: '2025-02-05' },
];

const leaveCalendar = [
  { date: 'Jun 24', type: 'Weekly Off', days: 1 },
  { date: 'Jun 17', type: 'Personal Leave', days: 1 },
  { date: 'Jun 2', type: 'Festival - Mahavir Jayanti', days: 1 },
  { date: 'May 26', type: 'Weekly Off', days: 1 },
  { date: 'May 12', type: 'Medical Leave', days: 2 },
  { date: 'Apr 14', type: 'Ambedkar Jayanti', days: 1 },
];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'present': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'absent': return <XCircle className="h-4 w-4 text-red-500" />;
    case 'leave': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'half-day': return <Minus className="h-4 w-4 text-orange-500" />;
    default: return <div className="h-4 w-4 rounded-full bg-muted" />;
  }
}

export default function DashboardSection() {
  const { setView } = useAppStore();

  const { data: bookingsData } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => fetch('/api/bookings?employerId=demo-employer-1').then(r => r.json()),
  });

  const bookings = bookingsData || [];

  const presentCount = attendanceData.filter(a => a.status === 'present').length;
  const totalDays = attendanceData.length;
  const attendancePercent = Math.round((presentCount / totalDays) * 100);
  const totalPaid = salaryRecords.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your workers, attendance, and payments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5" onClick={() => setView('browse')}>
          + Hire Worker
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Active Workers</span>
            </div>
            <p className="text-2xl font-bold">{bookings.filter((b: { status: string }) => b.status === 'active').length || 2}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Attendance Rate</span>
            </div>
            <p className="text-2xl font-bold">{attendancePercent}%</p>
            <Progress value={attendancePercent} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Monthly Payroll</span>
            </div>
            <p className="text-2xl font-bold">{'\u20B9'}{Number(24000).toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">2 active workers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Payment Due</span>
            </div>
            <p className="text-2xl font-bold">{'\u20B9'}{Number(12000).toLocaleString('en-IN')}</p>
            <Badge variant="outline" className="text-[10px] mt-1 text-orange-600 border-orange-300">Due in 3 days</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          <TabsTrigger value="attendance" className="text-xs sm:text-sm py-2"><Calendar className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Attendance</TabsTrigger>
          <TabsTrigger value="salary" className="text-xs sm:text-sm py-2"><DollarSign className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Salary</TabsTrigger>
          <TabsTrigger value="leave" className="text-xs sm:text-sm py-2"><FileText className="h-3.5 w-3.5 sm:mr-1.5 hidden sm:inline" />Leave</TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Attendance Record - Sunita Devi</CardTitle>
                <Badge variant="secondary" className="text-xs">June 2025</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium text-muted-foreground text-xs">Date</th>
                        <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                        <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Check In</th>
                        <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Check Out</th>
                        <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Hours</th>
                      </tr>
                    </thead>
                    <tbody className="max-h-96 overflow-y-auto custom-scrollbar">
                      {attendanceData.map((a) => {
                        const hours = a.checkIn && a.checkOut
                          ? (() => {
                              const [h1, m1] = a.checkIn.split(':').map(Number);
                              const [h2, m2] = a.checkOut.split(':').map(Number);
                              return ((h2 * 60 + m2 - h1 * 60 - m1) / 60).toFixed(1);
                            })()
                          : '-';
                        return (
                          <tr key={a.date} className="border-t hover:bg-muted/30">
                            <td className="p-3 font-medium">{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                            <td className="p-3"><div className="flex items-center gap-1.5"><StatusIcon status={a.status} /><span className="capitalize text-xs">{a.status.replace('-', ' ')}</span></div></td>
                            <td className="p-3 text-muted-foreground hidden sm:table-cell">{a.checkIn || '-'}</td>
                            <td className="p-3 text-muted-foreground hidden sm:table-cell">{a.checkOut || '-'}</td>
                            <td className="p-3 text-muted-foreground hidden sm:table-cell">{hours !== '-' ? `${hours}h` : '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Tab */}
        <TabsContent value="salary">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Salary Records - Sunita Devi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground text-xs">Month</th>
                      <th className="text-left p-3 font-medium text-muted-foreground text-xs">Amount</th>
                      <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Paid On</th>
                      <th className="text-right p-3 font-medium text-muted-foreground text-xs">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryRecords.map((s) => (
                      <tr key={s.month} className="border-t hover:bg-muted/30">
                        <td className="p-3 font-medium">{s.month}</td>
                        <td className="p-3">₹{s.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              s.status === 'paid' ? 'border-green-300 text-green-700' :
                              s.status === 'pending' ? 'border-orange-300 text-orange-600' :
                              'border-red-300 text-red-600'
                            }`}
                          >
                            {s.status === 'paid' ? 'Paid' : s.status === 'pending' ? 'Pending' : 'Overdue'}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground hidden sm:table-cell">{s.paidOn ? new Date(s.paidOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                        <td className="p-3 text-right">
                          {s.status === 'paid' && (
                            <Button variant="ghost" size="sm" className="text-xs text-primary">
                              <FileText className="h-3 w-3 mr-1" /> Download
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 bg-muted/30">
                      <td className="p-3 font-bold">Total Paid</td>
                      <td className="p-3 font-bold text-primary">₹{totalPaid.toLocaleString('en-IN')}</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {salaryRecords.some(s => s.status === 'pending') && (
                <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-orange-700">
                    <Clock className="h-4 w-4" />
                    <span>Salary payment for June 2025 is due in 3 days</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                    Pay Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Leave Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaveCalendar.map((l) => (
                  <div key={l.date} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{l.type}</p>
                        <p className="text-xs text-muted-foreground">{l.date}{l.days > 1 ? ` (${l.days} days)` : ''}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{l.days} day{l.days > 1 ? 's' : ''}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-muted/40 space-y-2">
                <h4 className="text-sm font-medium">Leave Summary (2025)</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-orange-600">4</p>
                    <p className="text-[10px] text-muted-foreground">Leaves Taken</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">8</p>
                    <p className="text-[10px] text-muted-foreground">Remaining</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">12</p>
                    <p className="text-[10px] text-muted-foreground">Total Allowed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}