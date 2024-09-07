'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { LinkButton } from '@/ui/linkButton';

type Request = {
  method: string;
  url: string;
  time: string;
};

const HistoryLogic = () => {
  const t = useTranslations('HistoryPage');
  const locale = useLocale();
  const tBtn = useTranslations('buttons.redirect');

  const [requestsExist, setRequestsExist] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);

  const saveLocalStorage = (requests: Request[]) => {
    localStorage.setItem('requestsHistory', JSON.stringify(requests));
  };

  const loadLocalStorage = () => {
    const storedRequests = localStorage.getItem('requestsHistory');
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
    const mockRequests: Request[] = [
      {
        method: 'POST',
        url: 'https://api.example.com/resource',
        time: new Date().toISOString()
      },
      {
        method: 'GET',
        url: 'https://api.example.com/resource/1',
        time: new Date().toISOString()
      },
      {
        method: 'GRAPHQL',
        url: 'https://graphql.example.com/query',
        time: new Date().toISOString()
      }
    ];

    saveLocalStorage(mockRequests);
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
          <LinkButton
            href={`/${locale}/restClient`}
            data-testid="rest-client-button"
          >
            {tBtn('restClient')}
          </LinkButton>
          <LinkButton
            href={`/${locale}/graphQlClient`}
            data-testid="graphql-client-button"
          >
            {tBtn('graphQlClient')}
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center" data-testid="history-container">
      <div className="max-w-md mx-auto">
        {requests.map((request, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg">
            <LinkButton
              href={linkRequest(request.method)}
              data-testid="graphql-client-button"
              className="text-lg underline text-blue-600 hover:text-blue-800"
            >
              <strong>{request.method}</strong> {request.url}
            </LinkButton>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HistoryLogic;
