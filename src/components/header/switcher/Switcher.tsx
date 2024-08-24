'use client';
import { useState } from 'react';

export const Switcher = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
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
