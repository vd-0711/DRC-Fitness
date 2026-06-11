import React from 'react';

// Minimal error boundary. If a child subtree throws at runtime (e.g. a WebGL /
// shader failure in the particle field), render `fallback` instead of letting
// the error blank the page.
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env?.DEV) console.warn('[DRC] subtree error, using fallback:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
