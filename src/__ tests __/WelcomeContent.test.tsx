import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WelcomeContent } from '@/components/welcomePage/welcomeContent/WelcomeContent';
import { data } from '@/components/welcomePage/welcomeContent/data';
import Image from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    'data-testid': dataTestId
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    'data-testid'?: string;
  }) => (
    <Image
      src={src as string}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid={dataTestId}
    />
  )
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>
}));

describe('WelcomeContent component', () => {
  it('renders Sign In and Sign Up buttons', () => {
    render(<WelcomeContent />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders the project title and description', () => {
    render(<WelcomeContent />);

    expect(screen.getByText(data.aboutProject.title)).toBeInTheDocument();
    expect(screen.getByText(data.aboutProject.description)).toBeInTheDocument();
  });

  it('renders the authors with GitHub links', () => {
    render(<WelcomeContent />);

    data.aboutAuthors.authors.forEach((author) => {
      const gitHubLink = screen.getByTestId(
        `gitHub${author.name.replace(' ', '')}`
      );
      expect(gitHubLink).toBeInTheDocument();
      expect(gitHubLink).toHaveAttribute(
        'alt',
        `GitHub profile of ${author.name}`
      );
      expect(gitHubLink.closest('a')).toHaveAttribute('href', author.linkGit);
    });
  });

  it('renders the course content with images', () => {
    render(<WelcomeContent />);

    expect(screen.getByText(data.aboutCourse.title)).toBeInTheDocument();

    data.aboutCourse.content.forEach((block) => {
      expect(screen.getByText(block.title)).toBeInTheDocument();
      const courseImage = screen.getByTestId('documentationCourse');
      expect(courseImage).toBeInTheDocument();
      expect(courseImage).toHaveAttribute('src', block.imgSrc);
      expect(screen.getByText(block.description)).toBeInTheDocument();
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<WelcomeContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
