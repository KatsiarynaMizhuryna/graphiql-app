'use client';

import { VariablesProps } from '@/interfaces/client';
import TableHeaders from '@/ui/table';

const Variables = ({ variables, setVariables }: VariablesProps) => {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="flex justify-between">
        <div className="self-end text-[25px]">Variables</div>
      </div>
      <TableHeaders variables={variables} setVariables={setVariables} />
    </div>
  );
};

export default Variables;
