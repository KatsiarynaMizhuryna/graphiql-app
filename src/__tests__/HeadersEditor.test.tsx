import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderEditor from '@/components/graphQL/headersEditor/HeadersEditor';

describe('HeaderEditor Component', () => {
  const mockSetHeaders = jest.fn();

  const renderComponent = (headers: string) => {
    render(<HeaderEditor headers={headers} setHeaders={mockSetHeaders} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the textarea with the correct initial headers value', () => {
    const initialHeaders = 'Authorization: Bearer token';
    renderComponent(initialHeaders);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(initialHeaders);
  });

  it('should call setHeaders when the user types in the textarea', () => {
    renderComponent('Initial header content');
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New header content' } });
    expect(mockSetHeaders).toHaveBeenCalledWith('New header content');
  });
  it('should render an empty textarea if no initial headers are provided', () => {
    renderComponent('');

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('');
  });
});
