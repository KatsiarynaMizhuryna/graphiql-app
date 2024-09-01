import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rest Client | Graph QL'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
