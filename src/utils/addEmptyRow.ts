import { Variable } from '@/types/client';

export const addEmptyRow = (
  variablesList: Variable[],
  index: number
): Variable[] => {
  const lastIndex = variablesList.length - 1;
  const currentVariable = variablesList[index];

  if (
    index === lastIndex &&
    (currentVariable.key.trim() !== '' ||
      currentVariable.value.trim() !== '' ||
      currentVariable.checked)
  ) {
    return [
      ...variablesList,
      { checked: false, key: '', value: '', description: '' }
    ];
  }

  return variablesList;
};
