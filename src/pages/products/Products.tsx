import { Link } from "react-router-dom";
import { ProductsCards } from "../../components/products/ProductsCards";

export const Products = () => {
  return (
    <>
      <Link to="/products/new">New Product</Link>
      <ProductsCards />
    </>
  );
};
