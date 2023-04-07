import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";

// if (import.meta.env["ENV_MODE"] === "production") {
//   disableReactDevTools();
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
