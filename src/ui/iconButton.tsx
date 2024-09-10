'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { IconButtonWithTextProps } from '@/interfaces/graphQl';

const IconButton: React.FC<IconButtonWithTextProps> = ({
  iconSrc,
  iconAlt,
  buttonText,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={20}
        height={15}
        className="w-full h-auto"
      />
      {isHovered && (
        <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          {buttonText}
        </span>
      )}
    </button>
  );
};

export default IconButton;
