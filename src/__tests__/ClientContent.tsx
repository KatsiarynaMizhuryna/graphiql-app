import { render, screen, fireEvent } from '@testing-library/react';
import ClientContent from '@/components/RESTClient/clientContent/ClientContent';
import { sendRequest } from '@/components/RESTClient/clientContent/sendRequest';
import '@testing-library/jest-dom';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [{ uid: 'test-uid' }, false, null])
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApp: jest.fn()
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn()
}));

jest.mock('@/components/RESTClient/clientContent/sendRequest', () => ({
  sendRequest: jest.fn()
}));

jest.mock('@/components/RESTClient/methodRequest/MethodRequest', () => {
  const MockMethodRequest = ({ setUrl }: { setUrl: (url: string) => void }) => {
    return (
      <div>
        <div>Mock MethodRequest</div>
        <input
          type="text"
          placeholder="Mock Input"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    );
  };
  MockMethodRequest.displayName = 'MockMethodRequest';
  return MockMethodRequest;
});

jest.mock('@/components/RESTClient/headers/Headers', () => {
  const MockHeaders = () => <div>Mock Headers</div>;
  MockHeaders.displayName = 'MockHeaders';
  return MockHeaders;
});

jest.mock('@/components/RESTClient/variables/Variables', () => {
  const MockVariables = () => <div>Mock Variables</div>;
  MockVariables.displayName = 'MockVariables';
  return MockVariables;
});

jest.mock('@/components/RESTClient/BodyRequest/BodyRequest', () => {
  const MockBodyRequest = () => <div>Mock BodyRequest</div>;
  MockBodyRequest.displayName = 'MockBodyRequest';
  return MockBodyRequest;
});

jest.mock('@/components/RESTClient/statusRequest/StatusRequest', () => {
  const MockStatusRequest = () => <div>Mock StatusRequest</div>;
  MockStatusRequest.displayName = 'MockStatusRequest';
  return MockStatusRequest;
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

beforeAll(() => {
  jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
});

describe('ClientContent Component', () => {
  it('should render all child components', () => {
    render(<ClientContent />);

    expect(screen.getByText(/Mock MethodRequest/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Headers/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Variables/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock BodyRequest/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock StatusRequest/i)).toBeInTheDocument();
  });

  it('should call sendRequest when the Send button is clicked', () => {
    render(<ClientContent />);

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    expect(sendRequest).toHaveBeenCalledWith(
      'GET',
      expect.any(String),
      expect.any(String),
      expect.any(Array),
      expect.any(String),
      expect.any(Function),
      expect.any(Function),
      'test-uid',
      expect.any(Array)
    );
  });

  it('should update URL when variables change', () => {
    render(<ClientContent />);

    const input = screen.getByPlaceholderText('Mock Input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');
  });

  it('should update encoded URL panel based on inputs', () => {
    render(<ClientContent />);

    expect(window.history.replaceState).toHaveBeenCalled();
  });
});
