import { createContext } from "react";
import type { Product } from "../types/product";

export const ProductContext = createContext<Product.ContextType>({
  products: [],
  loading: false,
  error: null,
});
