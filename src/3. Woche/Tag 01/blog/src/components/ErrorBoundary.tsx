"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "./ErrorAlert";
import { ReactNode } from "react";

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        // Hier sagen wir TypeScript: Behandle 'error' wie einen echten Error
        <ErrorAlert
          error={error as Error}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
      onError={(error, info) => {
        console.error("error: ", { error, info });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
