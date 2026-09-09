import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import Contact from "./pages/Contact";
import NezbowAI from "./pages/NezbowAI";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VaraAI from "./pages/VaraAI";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />

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