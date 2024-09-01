'use client';

import React, { Component, ErrorInfo } from 'react';
import Image from 'next/image';
import { nunito } from '@/ui/fonts';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="error-boundary"
          className="flex-grow container mx-auto flex flex-col items-center justify-around px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        >
          <h1
            data-testid="error-message"
            className={`text-6xl font-bold text-center ${nunito.className}`}
          >
            Something went wrong... &#10098;
          </h1>
          <h3 className={`text-6xl font-bold text-center ${nunito.className}`}>
            Come back later!
          </h3>
          <Image
            className="w-[300px] h-[400px]"
            src={'/wrong.png'}
            alt="Error Image"
            width={300}
            height={400}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
