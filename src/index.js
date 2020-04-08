import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { expireToken } from "./services/auth";
import { BrowserRouter } from "react-router-dom";

expireToken();

function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
