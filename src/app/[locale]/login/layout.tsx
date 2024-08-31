import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Graph QL'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
