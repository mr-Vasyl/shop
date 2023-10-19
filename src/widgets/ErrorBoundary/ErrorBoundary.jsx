import React, { Component } from "react";
import Error from "widgets/Error/Error";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: error };
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
