import React from 'react';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { ClerkProvider, useUser } from '@clerk/clerk-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ClerkProvider>
          <ToastProvider>
            <div>Something went wrong.</div>
            <ToastViewport />
          </ToastProvider>
        </ClerkProvider>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;