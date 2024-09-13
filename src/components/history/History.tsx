'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LinkButton } from '@/ui/linkButton';

type Request = {
  method: string;
  requestGraphQL: string;
  time: string;
};

const HistoryLogic = () => {
  const t = useTranslations('HistoryPage');
  const tt = useTranslations('loading');
  const locale = useLocale();
  const tBtn = useTranslations('buttons.redirect');
  const [requests, setRequests] = useState<Request[] | null>(null);

  useEffect(() => {
    const storedRequests = localStorage.getItem('graphql_requests');
    if (storedRequests) {
      const parsedRequests: Request[] = JSON.parse(storedRequests);
      parsedRequests.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      setRequests(parsedRequests);
    } else {
      setRequests([]);
    }
  }, []);

  const linkRequest = (method: string): string =>
    method === 'GRAPHQL' ? `/${locale}/graphQlClient` : `/${locale}/restClient`;

  if (requests === null) {
    return (
      <div className="text-center p-6 bg-gray-50 min-h-screen">
        <p>{tt('loading')}</p>
      </div>
    );
  }

  return (
    <div
      className="text-center p-6  min-h-screen"
      data-testid="history-container"
    >
      {requests.length === 0 ? (
        <div>
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
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {requests.map((request, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 mb-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <p className="text-gray-600 text-sm mb-2">
                {new Date(request.time).toLocaleString()}
              </p>
              <Link
                href={`${linkRequest(request.method)}/${request.requestGraphQL}`}
                data-testid="request-button"
                className="text-lg text-zinc-800 hover:text-zinc-400 break-all block font-medium"
              >
                {request.requestGraphQL}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryLogic;
