import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import './globals.css';
import { nunito } from '@/ui/fonts';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${nunito.className}`}>
      <Provider store={store}>
        <Header />
        { children }
        <Footer />
        </Provider>
      </body>
    </html>
  );
}
