import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Contact from "./pages/Contact";
import NezbowAI from "./pages/NezbowAI";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VaraAI from "./pages/VaraAI";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/vara-ai" element={<VaraAI />} />
        <Route path="/products/nezbow-ai" element={<NezbowAI />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);