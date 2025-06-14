"use client";

import { useEffect } from "react";
import { Container } from "@/app/components/Container";
import { Button } from "@/app/components/Button";
import Icon from "@/app/components/Icon";

/**
 * Error props interface
 */
interface ErrorProps {
  /** The error that occurred */
  error: Error & { digest?: string };
  /** Function to reset the error boundary */
  reset: () => void;
}

/**
 * Global error component for Next.js
 *
 * This component is used by Next.js to display errors that occur during rendering.
 * It provides a user-friendly error message and options to retry or go back home.
 */
export default function Error({ error, reset }: ErrorProps) {
  // Log the error to console in development
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-muted p-8 rounded-lg border border-border shadow-lg">
          <div className="flex items-center justify-center mb-6 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4">
            エラーが発生しました
          </h1>

          <p className="text-center mb-8 text-lg">
            申し訳ありませんが、問題が発生しました。
            <br />
            もう一度お試しいただくか、ホームページに戻ってください。
          </p>

          {process.env.NODE_ENV === "development" && error.message && (
            <div className="bg-black/10 dark:bg-white/10 p-4 rounded mb-8 overflow-auto max-h-40">
              <p className="font-mono text-sm mb-2 font-bold">エラー詳細:</p>
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} icon={<Icon name="home" />}>
              再試行する
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              ホームに戻る
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
