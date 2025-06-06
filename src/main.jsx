import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { globalStyles } from "./styles";

// Inject global styles
const styleElement = document.createElement("style");
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
