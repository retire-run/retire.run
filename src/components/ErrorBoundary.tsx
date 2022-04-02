import { RetireSaveDataKey } from "@/constants";
import { Component } from "react";

class ErrorBoundary extends Component {
  componentDidCatch(error: Error) {
    this.setState({ error });
    if (import.meta.env.PROD) {
      localStorage.removeItem(RetireSaveDataKey);
      window.location.reload();
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
