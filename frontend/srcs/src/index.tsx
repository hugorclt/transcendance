import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalProvider from "./services/Global/GlobalProvider";

if (process.env["ENV_MODE"] === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
      </GlobalProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
