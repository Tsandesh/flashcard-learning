import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { CardContextProvider } from "./context/Cardcontext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <CardContextProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </CardContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
