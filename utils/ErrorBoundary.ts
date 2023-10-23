import React, { useState, ReactNode } from "react";

// Define the props type
interface ErrorBoundaryProps {
  children: ReactNode;
}

function ErrorBoundary(props: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error: Error, info: React.ErrorInfo) => {
    // Handle the error here
    console.error(error, info);
    setHasError(true);
  };

  if (hasError) {
    // Render a fallback UI
    return <div>Something went wrong.</div>;
  }

  return <>{props.children}</>;
}

export default ErrorBoundary;
