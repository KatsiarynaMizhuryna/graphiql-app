import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import DocumentationViewer from '@/components/graphQL/documentationViewer/DocumentationViewer';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn()
}));

jest.mock('@graphiql/toolkit', () => ({
  createGraphiQLFetcher: jest.fn()
}));

jest.mock('@graphiql/react', () => ({
  GraphiQLProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DocExplorer: () => <div>DocExplorer Mock</div>
}));

describe('DocumentationViewer', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render an error message when fetcher is null', () => {
    render(<DocumentationViewer endpointUrl="" />);

    expect(screen.getByText('valid_graphQL_endpoint')).toBeInTheDocument();
  });

  it('should create a new fetcher and render the DocExplorer when endpointUrl is provided', () => {
    const mockFetcher = jest.fn();
    (createGraphiQLFetcher as jest.Mock).mockReturnValue(mockFetcher);

    render(
      <DocumentationViewer endpointUrl="http://example.com/graphql/?sdl" />
    );

    expect(createGraphiQLFetcher).toHaveBeenCalledWith({
      url: 'http://example.com/graphql/?sdl'
    });
    expect(screen.getByText('DocExplorer Mock')).toBeInTheDocument();
  });
});
