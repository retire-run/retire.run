import "@/i18n";
import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App></App>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
