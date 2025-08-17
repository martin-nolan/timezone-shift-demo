import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// The reactLogo import has been removed as react.svg is no longer needed.
// import reactLogo from './assets/react.svg'
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
