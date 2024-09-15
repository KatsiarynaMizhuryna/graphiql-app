import { render, screen, fireEvent } from '@testing-library/react';
import MethodRequest from '@/components/RESTClient/methodRequest/MethodRequest';
import '@testing-library/jest-dom';

interface InputRequestProps {
  url: string;
  setUrl: (url: string) => void;
  method: string;
  setMethod: (method: string) => void;
}

jest.mock('@/ui/inputRequest', () => {
  return function MockInputRequest({
    url,
    setUrl,
    method,
    setMethod
  }: InputRequestProps) {
    return (
      <div>
        <div>Mock InputRequest</div>
        <input
          type="text"
          value={url}
          placeholder="Mock URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </div>
    );
  };
});

describe('MethodRequest Component', () => {
  it('should render the MethodRequest component correctly', () => {
    const mockSetUrl = jest.fn();
    const mockSetMethod = jest.fn();
    const mockUrl = 'https://example.com';
    const mockMethod = 'GET';

    render(
      <MethodRequest
        url={mockUrl}
        setUrl={mockSetUrl}
        method={mockMethod}
        setMethod={mockSetMethod}
      />
    );

    expect(screen.getByText('Mock InputRequest')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Mock URL');
    expect(input).toHaveValue(mockUrl);

    const select = screen.getByDisplayValue(mockMethod);
    expect(select).toBeInTheDocument();
  });

  it('should call setUrl when the URL input changes', () => {
    const mockSetUrl = jest.fn();
    const mockSetMethod = jest.fn();
    const mockUrl = 'https://example.com';
    const mockMethod = 'GET';

    render(
      <MethodRequest
        url={mockUrl}
        setUrl={mockSetUrl}
        method={mockMethod}
        setMethod={mockSetMethod}
      />
    );

    const input = screen.getByPlaceholderText('Mock URL');
    fireEvent.change(input, { target: { value: 'https://new-url.com' } });

    expect(mockSetUrl).toHaveBeenCalledWith('https://new-url.com');
  });

  it('should call setMethod when the method select changes', () => {
    const mockSetUrl = jest.fn();
    const mockSetMethod = jest.fn();
    const mockUrl = 'https://example.com';
    const mockMethod = 'GET';

    render(
      <MethodRequest
        url={mockUrl}
        setUrl={mockSetUrl}
        method={mockMethod}
        setMethod={mockSetMethod}
      />
    );

    const select = screen.getByDisplayValue(mockMethod);
    fireEvent.change(select, { target: { value: 'POST' } });

    expect(mockSetMethod).toHaveBeenCalledWith('POST');
  });
});
