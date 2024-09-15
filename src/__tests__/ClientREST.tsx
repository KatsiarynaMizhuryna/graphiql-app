import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RestClientPage from '@/app/[locale]/restClient/[[...url]]/page';

jest.mock('@/components/RESTClient/clientContent/ClientContent', () => {
  const MockClientContent = () => <div>Mocked ClientContent</div>;
  MockClientContent.displayName = 'MockClientContent';
  return MockClientContent;
});

describe('RestClientPage', () => {
  it('should render ClientContent component', () => {
    const { getByText } = render(<RestClientPage />);
    expect(getByText('Mocked ClientContent')).toBeInTheDocument();
  });

  it('should render the main element with correct class names', () => {
    const { container } = render(<RestClientPage />);
    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass(
      'flex-grow gap-[50px] items-center justify-between px-24 py-5 max-[1000px]:p-7 max-[700px]:px-5'
    );
  });
});
