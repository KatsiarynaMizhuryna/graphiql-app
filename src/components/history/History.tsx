'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Request = {
  method: string;
  requestGraphQL: string;
  time: string;
};

const HistoryLogic = () => {
  const t = useTranslations('HistoryPage');
  const locale = useLocale();
  const tBtn = useTranslations('buttons.redirect');

  const [requestsExist, setRequestsExist] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);

  const loadLocalStorage = () => {
    const storedRequests = localStorage.getItem('graphql_requests');
    if (storedRequests) {
      const parsedRequests: Request[] = JSON.parse(storedRequests);
      parsedRequests.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      setRequests(parsedRequests);
      setRequestsExist(parsedRequests.length > 0);
    } else {
      setRequestsExist(false);
    }
  };

  useEffect(() => {
    loadLocalStorage();
  }, []);

  const linkRequest = (method: string): string => {
    if (method === 'GRAPHQL') {
      return `/${locale}/graphQlClient`;
    } else {
      return `/${locale}/restClient`;
    }
  };

  if (!requestsExist) {
    return (
      <div className="text-center" data-testid="history-container">
        <p className="text-xl" data-testid="history-subtitle">
          {t('subTitle')}
        </p>
        <div className="mt-4 space-x-4">
          <Link href={`/${locale}/restClient`} data-testid="rest-client-button">
            {tBtn('restClient')}
          </Link>
          <Link
            href={`/${locale}/graphQlClient`}
            data-testid="graphql-client-button"
          >
            {tBtn('graphQlClient')}
          </Link>
        </div>
      </div>
    );
  }

  const handleButtonClick = (request: Request) => {
    // const queryParams = qs.stringify({
    //   method: request.method,
    //   requestGraphQL: request.requestGraphQL,
    //   time: request.time
    // });
    console.log(linkRequest(request.method));
    console.log(request.requestGraphQL);
    //router.push(`${linkRequest(request.method)}/${request.requestGraphQL}`);
  };

  return (
    <div className="text-center" data-testid="history-container">
      <div className="max-w-md mx-auto">
        {requests.map((request, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg">
            <p>
              {request.time.split('T')[0]}{' '}
              {request.time.split('T')[1].split('.')[0]}
            </p>
            <button
              onClick={() => handleButtonClick(request)}
              data-testid="request-button"
              className="text-lg underline text-blue-600 hover:text-blue-800"
            >
              <strong>{request.requestGraphQL}</strong>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HistoryLogic;
