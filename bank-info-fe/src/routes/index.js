// create the Router object to handle pagination

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import reportWebVitals from "reportWebVitals";
import App from "./../App";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <Toaster />
      </div>
    </QueryClientProvider>
  </StrictMode>,
);

reportWebVitals();
