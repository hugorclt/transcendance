import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalProvider from "./services/Global/GlobalProvider";
import { AppContainer } from "./components/common/commonStyle";

if (import.meta.env["ENV_MODE"] === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppContainer>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </AppContainer>
);
