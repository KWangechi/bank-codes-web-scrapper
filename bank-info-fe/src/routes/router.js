// create the Router object to handle pagination

// const { Router } = require("react-router-dom");
// import App from "App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Test  from "test/Test";

const router = createBrowserRouter([
  { path: "/", element: <Test /> },
  // Add more routes as needed
]);

console.log(router);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
