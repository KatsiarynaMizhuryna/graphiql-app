import { InputProps } from '@/interfaces/Input';
import React, { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
