import React from 'react';
import { UserProvider } from '@/store/userContext';
import './globals.css';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
