import { ProductProvider } from "./context/ProductProvider";
import { Routes } from "./routes";

export const App = () => {
  return (
    <ProductProvider>
      <Routes />
    </ProductProvider>
  );
};
