import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { expireToken } from "./services/auth";
import { BrowserRouter } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./styles/globalStyle.css";

dayjs.extend(relativeTime);

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
