"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Container } from "@/app/components/Container";
import { Button } from "@/app/components/Button";

/**
 * Error boundary props interface
 */
interface ErrorBoundaryProps {
  /** Child components */
  children: ReactNode;
  /** Fallback component to render when an error occurs */
  fallback?: ReactNode;
}

/**
 * Error boundary state interface
 */
interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error: Error | null;
}

/**
 * ErrorBoundary component
 *
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  /**
   * Reset the error state
   */
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Container className="py-12">
          <div className="bg-muted p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
            <p className="mb-6">申し訳ありませんが、問題が発生しました。</p>
            {this.state.error && (
              <div className="bg-black/10 dark:bg-white/10 p-4 rounded mb-6 overflow-auto max-h-40">
                <pre className="text-sm font-mono">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            <div className="flex gap-4">
              <Button onClick={this.resetErrorBoundary}>再試行</Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                ホームに戻る
              </Button>
            </div>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
