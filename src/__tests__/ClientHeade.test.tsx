import { render, screen, fireEvent } from '@testing-library/react';
import Headers from '@/components/RESTClient/headers/Headers';
import { VariablesProps, Variable } from '@/interfaces/client'; // Import the correct types
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
                key: 'New Key',
                value: 'New Value',
                checked: false,
                description: 'New Description'
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

describe('Headers Component', () => {
  it('should render the Headers component correctly and use setVariables', () => {
    const mockVariables: Variable[] = [
      {
        key: 'Authorization',
        value: 'Bearer token',
        checked: true,
        description: 'Authorization header'
      }
    ];

    const mockSetVariables = jest.fn();

    render(
      <Headers variables={mockVariables} setVariables={mockSetVariables} />
    );

    expect(screen.getByText('Headers')).toBeInTheDocument();

    expect(screen.getByText(/Mock TableHeaders/i)).toBeInTheDocument();
    expect(screen.getByText(/Variables Length: 1/i)).toBeInTheDocument();

    const addButton = screen.getByText('Add Variable');
    fireEvent.click(addButton);

    expect(mockSetVariables).toHaveBeenCalledWith([
      {
        key: 'Authorization',
        value: 'Bearer token',
        checked: true,
        description: 'Authorization header'
      },
      {
        key: 'New Key',
        value: 'New Value',
        checked: false,
        description: 'New Description'
      }
    ]);
  });
});
