'use client';

import React from 'react';
import { MethodRequestProps } from '@/interfaces/client';
import InputRequest from '@/ui/inputRequest';

const MethodRequest: React.FC<MethodRequestProps> = ({
  url,
  setUrl,
  method,
  setMethod
}) => {
  return (
    <InputRequest
      url={url}
      setUrl={setUrl}
      method={method}
      setMethod={setMethod}
    />
  );
};

export default MethodRequest;
