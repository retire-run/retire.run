import "@/i18n";
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root")!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App></App>
    </ErrorBoundary>
  </React.StrictMode>
);
