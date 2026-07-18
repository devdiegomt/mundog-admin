import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "../pages/Root";
import { Products } from "../pages/products/Products";
import { Login } from "../pages/login/Login";
import { productFormAction } from "./product-action";
import { getProducts } from "../api/products";
import { isLoggedIn } from "../api/auth";

const productsLoader = async () => getProducts();

// Si no hay sesión, redirige al login antes de renderizar el panel
const RequireAuth = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export const Routes = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              path: "/",
              element: <Products />,
              loader: productsLoader,
              action: productFormAction,
            },
            {
              path: "/:id",
              element: <Products />,
              loader: productsLoader,
              action: productFormAction,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
