import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VariablesEditor from '@/components/graphQL/variablesEditor/VariablesEditor';

describe('VariablesEditor Component', () => {
  const mockSetVariables = jest.fn();

  it('should render the textarea with initial variables value', () => {
    render(
      <VariablesEditor
        variables="initial value"
        setVariables={mockSetVariables}
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('initial value');
  });

  it('should call setVariables when the value changes', () => {
    render(<VariablesEditor variables="" setVariables={mockSetVariables} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new variable value' } });
    expect(mockSetVariables).toHaveBeenCalledWith('new variable value');
  });

  it('should reflect updated variables value when props change', () => {
    const { rerender } = render(
      <VariablesEditor
        variables="initial value"
        setVariables={mockSetVariables}
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('initial value');

    rerender(
      <VariablesEditor
        variables="updated value"
        setVariables={mockSetVariables}
      />
    );

    expect(textarea).toHaveValue('updated value');
  });
});
