'use client';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { nunito } from '@/ui/fonts';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';

import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${nunito.className}`}
        data-testid="children-content"
      >
        <Provider store={store}>
          <ErrorBoundary>
            <Header />
            {children}
            <Footer />
          </ErrorBoundary>
        </Provider>
      </body>
    </html>
  );
}
