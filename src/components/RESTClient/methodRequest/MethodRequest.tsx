'use client';

import React from 'react';
import { MethodRequestProps } from '@/types/client';
import InputRequest from '@/ui/inputRequest';

const MethodRequest: React.FC<MethodRequestProps> = ({
  url,
  setUrl,
  method,
  setMethod
}) => {
  return (
    <div className="">
      <InputRequest
        url={url}
        setUrl={setUrl}
        method={method}
        setMethod={setMethod}
      />
    </div>
  );
};

export default MethodRequest;
