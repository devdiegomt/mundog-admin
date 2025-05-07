import { ProductsCards } from "../../components/products/ProductsCards";
import { useRef } from "react";
import { ProductForm } from "../../components/products/ProductForm";
import type { ProductFormRef } from "../../components/products/ProductForm";

export const Products = () => {
  const formRef = useRef<ProductFormRef>(null);

  return (
    <>
      <button type="button" onClick={() => formRef.current?.open()}>
        Add Product
      </button>
      <ProductForm ref={formRef} />
      <ProductsCards />
    </>
  );
};
