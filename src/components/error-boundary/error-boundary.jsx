import React, { Component } from "react";
import "./error-boundary.styles.scss"

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hassErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hassErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hassErrored) {
      return <div className="error-boundary">Ops! Algo deu errado...</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
