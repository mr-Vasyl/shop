import React, { Component } from "react";
import Error from "widgets/Error/Error";
class ErrorBoundary extends Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error) {
    return { error };
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
