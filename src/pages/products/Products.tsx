import { ProductsCards } from "../../components/products/ProductsCards";
import { useRef } from "react";
import { ProductForm } from "../../components/products/ProductForm";
import type { ProductFormRef } from "../../components/products/ProductForm";
import classes from "./Products.module.css";

export const Products = () => {
  const formRef = useRef<ProductFormRef>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => formRef.current?.open()}
        className={classes["add-button"]}
      >
        +
      </button>
      <ProductForm ref={formRef} />
      <ProductsCards />
    </>
  );
};
