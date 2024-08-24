import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeContent from '@/components/welcomePage/welcomeContent/WelcomeContent';
import { LinkButton } from '@/ui/linkButton';
import Image from 'next/image';
import { ReactNode } from 'react';

jest.mock('@/ui/linkButton', () => ({
  LinkButton: ({ href, children }: { href: string; children: ReactNode }) => (
    <LinkButton href={href} data-testid={`linkButton-${children}`}>
      {children}
    </LinkButton>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: {src: string; alt: string; children: ReactNode }) => (
    <Image src={src} alt={alt} {...props} />
  ),
}));

describe('WelcomeContent Component', () => {
  it('should render Sign In and Sign Up buttons', () => {
    render(<WelcomeContent />);

    expect(screen.getByTestId('linkButton-Sign In')).toBeInTheDocument();
    expect(screen.getByTestId('linkButton-Sign Up')).toBeInTheDocument();
  });
});
