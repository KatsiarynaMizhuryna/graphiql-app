'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LinkButton } from '@/ui/linkButton';
import { UserRequest } from '@/interfaces/user';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { checkedLocalStorage } from '@/store/localStorage';

const HistoryLogic = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const email = user?.email;
  const t = useTranslations('HistoryPage');
  const locale = useLocale();
  const tBtn = useTranslations('buttons.redirect');
  const [requests, setRequests] = useState<UserRequest[] | null>(null);

  useEffect(() => {
    if (uid && email) {
      checkedLocalStorage(uid, email);
    }

    const storedRequests = localStorage.getItem('users');
    if (storedRequests) {
      try {
        const parsedRequests = JSON.parse(storedRequests) as {
          [key: string]: {
            uid: string;
            isLogged: boolean;
            email: string;
            history: UserRequest[];
          };
        };

        const requestArray = Object.values(parsedRequests)
          .flatMap((userObj) => userObj.history)
          .filter(
            (request) => request && request.request && request.request.date
          );

        requestArray.sort(
          (a, b) =>
            new Date(b.request.date).getTime() -
            new Date(a.request.date).getTime()
        );

        setRequests(requestArray);
      } catch (error) {
        console.error('Error parsing stored requests:', error);
        setRequests([]);
      }
    } else {
      setRequests([]);
    }
  }, [uid, email]);

  const linkRequest = (method: string): string =>
    method === 'GRAPHQL' ? `/${locale}/graphQlClient` : `/${locale}/restClient`;

  if (requests === null) {
    return (
      <div className="text-center p-6 bg-gray-50 min-h-screen">
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div
      className="text-center p-6 min-h-screen"
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
                {new Date(request.request.date).toLocaleString()}
              </p>
              <Link
                href={`${linkRequest(request.request.method)}/${request.request.method}/${request.request.url}?query=${request.request.body}&variables=${request.request.variable}&headers=${request.request.headers}`}
                data-testid="request-button"
                className="text-lg text-zinc-800 hover:text-zinc-400 break-all block font-medium"
              >
                {request.request.method}/{request.request.url}?query=
                {request.request.body}&variables={request.request.variable}
                &headers={request.request.headers}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryLogic;
