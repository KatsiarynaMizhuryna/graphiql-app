import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { nunito } from '@/ui/fonts';
import { CustomToaster } from '@/ui/toaster';
import React from 'react';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home'
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`flex flex-col min-h-screen ${nunito.className}`}
        data-testid="children-content"
      >
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <CustomToaster />
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
