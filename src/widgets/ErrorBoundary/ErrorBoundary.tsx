import React, { Component, PropsWithChildren } from "react";
import Error from "widgets/Error/Error";

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
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
