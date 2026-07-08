'use client';

import { useSession, signOut, signIn } from 'next-auth/react';

interface AuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  workerId?: string;
  employerId?: string;
}

export function useAuth() {
  const { data: session, status, update } = useSession();

  const user: AuthUser = session?.user
    ? {
        id: (session.user as Record<string, unknown>).id as string | undefined,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as Record<string, unknown>).role as string | undefined,
        workerId: (session.user as Record<string, unknown>).workerId as string | undefined,
        employerId: (session.user as Record<string, unknown>).employerId as string | undefined,
      }
    : {};

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const isAdmin = user.role === 'admin';
  const isWorker = user.role === 'worker';
  const isEmployer = user.role === 'employer' || user.role === undefined;

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    isAdmin,
    isWorker,
    isEmployer,
    login,
    logout,
    update,
  };
}