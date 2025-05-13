import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* import { Home } from "../pages/home/Home"; */
import { RootLayout } from "../pages/Root";
import { Products } from "../pages/products/Products";
import { productFormAction } from "./product-action";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        /* { index: true, element: <Home /> }, */
        {
          path: "/",
          element: <Products />,
          action: productFormAction,
        },
        {
          path: "/:id",
          element: <Products />,
          action: productFormAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
