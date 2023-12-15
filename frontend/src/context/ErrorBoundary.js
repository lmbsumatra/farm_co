// HigherLevelErrorBoundary.js
import React, { Component } from 'react';

class HigherLevelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log or handle the error as needed
    console.error('Error caught by higher-level error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI or message here
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

export default HigherLevelErrorBoundary;
