'use client';
import { VariablesProps } from '@/interfaces/client';
import TableHeaders from '@/ui/table';

const Headers = ({ variables, setVariables }: VariablesProps) => {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="flex justify-between">
        <div className="self-end text-[25px]">Headers</div>
      </div>
      <TableHeaders variables={variables} setVariables={setVariables} />
    </div>
  );
};

export default Headers;
