'use client'
import { useEffect, useState } from 'react';
import { LinkButton } from '@/ui/linkButton';
const HistoryLogic = () => {
  const [requestsExist, setRequestsExist] = useState(false);

  useEffect(() => {
    const requests = localStorage.getItem('requests');
    if (requests) {
      setRequestsExist(true);
    }
  }, []);

  if (!requestsExist) {
    return (
      <div className="text-center">
        <p className="text-xl">You have not executed any requests yet</p>
        <div className="mt-4 space-x-4">
          <LinkButton href="/restClient">REST Client</LinkButton>
          <LinkButton href="/graphQlClient">Graph-QL Client</LinkButton>
        </div>
      </div>
    );
  }
}

export default HistoryLogic;