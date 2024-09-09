'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export const Switcher = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const [isChecked, setIsChecked] = useState(localActive === 'ru');

  const handleChange = () => {
    const locale = isChecked ? 'en' : 'ru';
    const pathPage = pathname.split('/').slice(2).join('/');
    setIsChecked(!isChecked);
    startTransition(() => {
      const newUrl = `/${locale}/${pathPage}`;
      router.replace(newUrl);
    });
  };

  return (
    <label
      htmlFor="accept-conditions"
      className={`relative inline-block h-8 w-toggle border-indigo-600 cursor-pointer rounded-full transition ${isChecked ? 'bg-indigo-300' : 'bg-indigo-600'}`}
    >
      <input
        type="checkbox"
        id="accept-conditions"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
      />
      <span
        className={`absolute inset-y-0 m-1 h-6 w-12 flex items-center justify-center text-xs font-medium text-gray-700 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-12' : 'translate-x-0'}`}
      >
        {isChecked ? 'RU' : 'EN'}
      </span>
    </label>
  );
};
