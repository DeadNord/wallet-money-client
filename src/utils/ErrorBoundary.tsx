import { Component, ErrorInfo, ReactNode } from 'react';
import FallbackComponent from 'views/fallbackComponent/FallbackComponent';

interface Props {
  children: ReactNode; // Type for children elements
}

interface State {
  hasError: boolean; // Flag to indicate if an error occurred
  errorMessage?: string; // Store the error message
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false }; // Initializing state
  }

  // Lifecycle method to update state when an error is caught
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  // Lifecycle method to log error info
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    // Check if there was an error
    if (this.state.hasError) {
      // Render the fallback UI if an error occurred
      return <FallbackComponent errorMessage={this.state.errorMessage} />;
    }

    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
