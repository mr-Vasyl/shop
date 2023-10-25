import React, { Component, ReactNode } from "react";
import Error from "widgets/Error/Error";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }
  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <Error content="Seems like an error occured!" error={error.message} />
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
