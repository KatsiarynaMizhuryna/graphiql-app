import { render, screen, fireEvent } from '@testing-library/react';
import BodyRequest from '@/components/RESTClient/BodyRequest/BodyRequest';
import '@testing-library/jest-dom';

interface BodyEditorProps {
  content: string;
  setContent: (value: string) => void;
  isReadOnly: boolean;
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('@/ui/editor', () => {
  const MockBodyEditor = ({
    content,
    setContent,
    isReadOnly
  }: BodyEditorProps) => (
    <div>
      <div>Mock BodyEditor</div>
      <div>{isReadOnly ? 'ReadOnly' : 'Editable'}</div>
      <textarea
        readOnly={isReadOnly}
        value={content}
        onChange={(e) => {
          if (!isReadOnly) {
            setContent(e.target.value);
          }
        }}
      />
    </div>
  );
  MockBodyEditor.displayName = 'MockBodyEditor';
  return MockBodyEditor;
});

describe('BodyRequest Component', () => {
  it('should render the body editor', () => {
    render(<BodyRequest body="{}" method="POST" setBody={jest.fn()} />);

    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Mock BodyEditor')).toBeInTheDocument();
  });

  it('should render the BodyEditor as editable for POST method', () => {
    render(<BodyRequest body="{}" method="POST" setBody={jest.fn()} />);

    expect(screen.getByText('Editable')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).not.toHaveAttribute('readOnly');
  });

  it('should render the BodyEditor as read-only for GET method', () => {
    render(<BodyRequest body="{}" method="GET" setBody={jest.fn()} />);

    expect(screen.getByText('ReadOnly')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readOnly');
  });

  it('should call setBody when the content changes', () => {
    const setBodyMock = jest.fn();
    render(<BodyRequest body="{}" method="POST" setBody={setBodyMock} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '{"key":"value"}' } });

    expect(setBodyMock).toHaveBeenCalledWith('{"key":"value"}');
  });

  it('should not allow content changes when read-only', () => {
    const setBodyMock = jest.fn();
    render(<BodyRequest body="{}" method="GET" setBody={setBodyMock} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '{"key":"value"}' } });

    expect(setBodyMock).not.toHaveBeenCalled();
  });
});
