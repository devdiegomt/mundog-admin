import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { RootLayout } from "../pages/Root";
import { Products } from "../pages/products/Products";
import { NewProduct } from "../pages/products/NewProduct";

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
        },
        { path: "/products/new", element: <NewProduct /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
