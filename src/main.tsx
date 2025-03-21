import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import QuizGame from "./QuizGame.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizGame />
  </StrictMode>,
);
