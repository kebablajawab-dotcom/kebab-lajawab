import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if ((this as any).state.hasError) {
      let errorMessage = "Something went wrong.";
      
      try {
        // Try to parse Firestore JSON error
        const firestoreError = JSON.parse((this as any).state.error?.message || "");
        if (firestoreError.error && firestoreError.error.includes("Missing or insufficient permissions")) {
          errorMessage = `Security Error: You don't have permission to ${firestoreError.operationType} at ${firestoreError.path}.`;
        }
      } catch (e) {
        // Not a Firestore JSON error
        errorMessage = (this as any).state.error?.message || "An unexpected error occurred.";
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal p-4 text-center">
          <div className="glass-card p-8 max-w-md">
            <h2 className="text-2xl font-serif font-bold text-gold mb-4">Oops!</h2>
            <p className="text-white/80 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gold text-charcoal font-bold rounded-lg hover:bg-amber-accent transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
