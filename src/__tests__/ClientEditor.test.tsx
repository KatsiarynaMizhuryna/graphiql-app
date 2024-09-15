import { render, screen, fireEvent } from '@testing-library/react';
import BodyEditor from '@/ui/editor';
import '@testing-library/jest-dom';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  error: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('BodyEditor UI Component', () => {
  const mockSetContent = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the textarea when not read-only', () => {
    render(
      <BodyEditor
        content=""
        setContent={mockSetContent}
        isReadOnly={false}
        method="POST"
      />
    );

    const textarea = screen.getByPlaceholderText('Enter JSON here...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toBeDisabled();
  });

  it('should render the read-only mode with a message when content is empty', () => {
    render(
      <BodyEditor
        content=""
        setContent={mockSetContent}
        isReadOnly={true}
        method="GET"
      />
    );

    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('should handle invalid JSON and display error when prettify button is clicked', () => {
    const invalidJson = '{"key": "value"';
    render(
      <BodyEditor
        content={invalidJson}
        setContent={mockSetContent}
        isReadOnly={false}
        method="POST"
      />
    );

    const prettifyButton = screen.getByText('Prettify');
    fireEvent.click(prettifyButton);

    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Error'));

    const errorMessage = screen.getByText(
      /Expected ',' or '}' after property value/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle valid JSON input in textarea and call setContent', () => {
    render(
      <BodyEditor
        content=""
        setContent={mockSetContent}
        isReadOnly={false}
        method="POST"
      />
    );

    const textarea = screen.getByPlaceholderText('Enter JSON here...');
    fireEvent.change(textarea, { target: { value: '{"key": "value"}' } });

    expect(mockSetContent).toHaveBeenCalledWith('{"key": "value"}');
    expect(textarea).toHaveValue('{"key": "value"}');
  });

  it('should not allow changes when method is GET, HEAD, or OPTIONS', () => {
    render(
      <BodyEditor
        content=""
        setContent={mockSetContent}
        isReadOnly={false}
        method="GET"
      />
    );

    const textarea = screen.getByPlaceholderText(
      'Request body is not required for this method'
    );
    expect(textarea).toBeDisabled();
  });
});
