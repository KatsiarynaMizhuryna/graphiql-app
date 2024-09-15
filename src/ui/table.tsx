import { Variable, VariablesProps } from '@/interfaces/client';
import { addEmptyRow } from '@/utils/addEmptyRow';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

const TableHeaders = ({ variables, setVariables }: VariablesProps) => {
  const t = useTranslations('RestClientPage');
  const headers = [`${t('Key')}`, `${t('Value')}`, `${t('Description')}`];

  useEffect(() => {
    if (variables.length === 0) {
      setVariables([{ checked: false, key: '', value: '', description: '' }]);
    }
  }, [setVariables, variables.length]);

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newVariables = [...variables];
      newVariables[index].checked = event.target.checked;

      newVariables = addEmptyRow(newVariables, index);

      setVariables(newVariables);
    };

  const handleInputChange =
    (index: number, field: keyof Omit<Variable, 'checked'>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newVariables = [...variables];
      newVariables[index][field] = event.target.value;

      newVariables = addEmptyRow(newVariables, index);

      setVariables(newVariables);
    };

  return (
    <div className="table-container w-full max-h-[200px] overflow-x-auto custom-scrollbar">
      <div className="table w-full overflow-y-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="border-r p-2"></th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    {header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variables.map((variable, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-50 text-center">
                <td className="p-2 border-r w-[40px]">
                  <input
                    type="checkbox"
                    checked={variable.checked}
                    onChange={handleCheckboxChange(rowIndex)}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={variable.key}
                    onChange={handleInputChange(rowIndex, 'key')}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={variable.value}
                    onChange={handleInputChange(rowIndex, 'value')}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    type="text"
                    className="border p-1 w-full"
                    value={variable.description}
                    onChange={handleInputChange(rowIndex, 'description')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHeaders;
