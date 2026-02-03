import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import Aos from "aos";
import AuthProvider from "./CONTEXT/AuthContext/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <div className="font-urbanist max-w-auto mx-auto">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: "Urbanist, sans-serif",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#D4E96D",
                    secondary: "#0D2A38",
                  },
                },
              }}
            />
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  </StrictMode>,
);
