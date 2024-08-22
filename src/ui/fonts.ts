import { Nunito, Oswald, Ubuntu } from 'next/font/google';

export const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

export const oswald = Oswald({
  weight: ['400', '500', '600'],
  subsets: ['latin']
});

export const ubuntu = Ubuntu({
  weight: ['400', '500'],
  subsets: ['latin']
});
