import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);