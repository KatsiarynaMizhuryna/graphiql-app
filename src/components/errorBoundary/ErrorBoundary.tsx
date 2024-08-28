'use client'
import { Component, ReactNode } from 'react';
import Image from 'next/image';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary" className="flex-grow container mx-auto flex flex-col items-center justify-around px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h1 data-testid="error-message">Something went wrong... Refresh this page</h1>
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