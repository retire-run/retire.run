import { RetireSaveDataKey } from "@/constants";
import { Loader } from "@mantine/core";
import { Component } from "react";

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
    localStorage.removeItem(RetireSaveDataKey);
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      return <Loader size="xl"></Loader>;
    }

    return children;
  }
}

export default ErrorBoundary;
