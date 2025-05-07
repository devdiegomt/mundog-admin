import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { RootLayout } from "../pages/Root";
import { Products } from "../pages/products/Products";
import { productAction } from "./product-action";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "products",
          element: <Products />,
          action: productAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
