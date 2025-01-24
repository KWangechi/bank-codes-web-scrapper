// create the Router object to handle pagination

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import reportWebVitals from "reportWebVitals";
// import Test from "test/Test";
import App from './../App';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  
  // Add more routes as needed
]);

// console.log(router);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

reportWebVitals();

