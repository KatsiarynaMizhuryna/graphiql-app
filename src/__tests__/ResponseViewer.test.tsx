import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResponseViewer from '@/components/graphQL/responseViewer/ResponseViewer';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'GraphClientPage.status': 'Status'
    };
    return translations[key] || key;
  }
}));

describe('ResponseViewer Component', () => {
  it('should render the response and status when response is present', () => {
    const response = { data: { message: 'Success', details: { id: 123 } } };
    const status = '200';

    render(
      <ResponseViewer
        response={JSON.stringify(response, null, 2)}
        status={status}
      />
    );
    const statusText = screen.getByText(/Status: 200/i);
    expect(statusText).toBeInTheDocument();
    const { container } = render(
      <ResponseViewer
        response={JSON.stringify(response, null, 2)}
        status="200"
      />
    );
    const preElement = container.querySelector('pre');
    expect(preElement).toBeInTheDocument();
  });

  it('should apply green text color for status 200', () => {
    const response = { message: 'Success' };
    const status = '200';

    render(<ResponseViewer response={response.message} status={status} />);
    const statusText = screen.getByText(/Status: 200/i);
    expect(statusText).toHaveClass('text-green-800');
  });

  it('should apply red text color for non-200 status', () => {
    const response = { message: 'Error' };
    const status = '500';

    render(<ResponseViewer response={response.message} status={status} />);
    const statusText = screen.getByText(/Status: 500/i);
    expect(statusText).toHaveClass('text-red-500');
  });

  it('should not render <pre> element with no content when response is not provided', () => {
    const { container } = render(
      <ResponseViewer response={undefined} status="500" />
    );
    const preElement = container.querySelector('pre');
    expect(preElement).not.toBeInTheDocument();
  });
});
