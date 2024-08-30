import React from 'react';
import { UserProvider } from '@/store/userContext';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Graph QL',
    default: 'Graph QL'
  },
  description: 'RS School Training Project',
  metadataBase: new URL('https://rs.school/courses/reactjs')
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
