import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Log the error or handle it appropriately
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
