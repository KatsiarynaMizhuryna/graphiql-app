import { render, screen } from '@testing-library/react';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';
import { LinkButton } from '@/ui/linkButton';

jest.mock('@/ui/linkButton', () => ({
  LinkButton: ({ children, href }: { children: React.ReactNode, href: string }) => (
    <LinkButton href={href}>{children}</LinkButton>
  ),
}));

describe('BlockBtnApps', () => {
  it('renders three LinkButton components with correct texts and hrefs', () => {
    render(<BlockBtnApps />);

    // Проверяем, что все кнопки рендерятся с правильным текстом
    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();

    // Проверяем, что каждая кнопка имеет правильный href
    expect(screen.getByText('REST Client')).toHaveAttribute('href', '/restClient');
    expect(screen.getByText('GraphiQL Client')).toHaveAttribute('href', '/graphQLClient');
    expect(screen.getByText('History')).toHaveAttribute('href', '/history');
  });

  // it('applies the correct classes to the container div', () => {
  //   const { container } = render(<BlockBtnApps />);

  //   // Проверяем, что контейнер имеет правильные классы
  //   const divElement = container.querySelector('div');
  //   expect(divElement).toHaveClass('w-full', 'flex', 'justify-between', 'max-sm:flex-col', 'max-sm:text-center', 'max-sm:gap-5', 'pb-10');
  // });
});