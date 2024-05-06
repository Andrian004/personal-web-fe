import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ThemeProvider } from "@/providers/theme-provider";
import { CookiesProvider } from "react-cookie";
import { QueryProvider } from "@/providers/query-provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
