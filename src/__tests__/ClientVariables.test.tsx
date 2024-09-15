import { render, screen, fireEvent } from '@testing-library/react';
import Variables from '@/components/RESTClient/variables/Variables';
import { VariablesProps, Variable } from '@/interfaces/client';
import '@testing-library/jest-dom';

jest.mock('@/ui/table', () => {
  return function MockTableHeaders({
    variables,
    setVariables
  }: VariablesProps) {
    return (
      <div>
        Mock TableHeaders - Variables Length: {variables.length}
        <button
          onClick={() =>
            setVariables([
              ...variables,
              {
                key: 'newKey',
                value: 'newValue',
                checked: true,
                description: 'newDescription'
              }
            ])
          }
        >
          Add Variable
        </button>
      </div>
    );
  };
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('Variables Component', () => {
  it('should render the Variables component correctly', () => {
    const mockVariables: Variable[] = [
      {
        key: 'Param1',
        value: 'Value1',
        checked: true,
        description: 'Description1'
      }
    ];
    const mockSetVariables = jest.fn();

    render(
      <Variables variables={mockVariables} setVariables={mockSetVariables} />
    );

    expect(screen.getByText('Variables')).toBeInTheDocument();

    expect(screen.getByText(/Mock TableHeaders/i)).toBeInTheDocument();
    expect(screen.getByText(/Variables Length: 1/i)).toBeInTheDocument();
  });

  it('should call setVariables when the Add Variable button is clicked', () => {
    const mockVariables: Variable[] = [
      {
        key: 'Param1',
        value: 'Value1',
        checked: true,
        description: 'Description1'
      }
    ];
    const mockSetVariables = jest.fn();

    render(
      <Variables variables={mockVariables} setVariables={mockSetVariables} />
    );

    const addButton = screen.getByText('Add Variable');
    fireEvent.click(addButton);

    expect(mockSetVariables).toHaveBeenCalledWith([
      ...mockVariables,
      {
        key: 'newKey',
        value: 'newValue',
        checked: true,
        description: 'newDescription'
      }
    ]);
  });
});
