import * as React from 'react';

import { ErrorFallback } from '../../components/ErrorFallback';

const logErrorToMyService = (error, errorInfo) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log('Error Boundary: ', error, '  : Info ', errorInfo);
};

const myErrorHandler = (error: Error, info: { componentStack: string }) => {};

class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
    this.props.onError && this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
