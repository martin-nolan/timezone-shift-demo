import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class TimezoneErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Timezone Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>🚫 Timezone Operation Failed</h2>
            <p>
              Something went wrong with the timezone operation. This could be
              due to:
            </p>
            <ul>
              <li>Invalid timezone identifier</li>
              <li>Browser timezone support issues</li>
              <li>Network connectivity problems</li>
            </ul>
            <details className="error-details">
              <summary>Technical Details</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
            <button
              className="retry-button"
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
