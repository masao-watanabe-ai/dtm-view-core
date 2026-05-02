import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TracePage } from "../pages/TracePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TracePage />
  </StrictMode>
);
