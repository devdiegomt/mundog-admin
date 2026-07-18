import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ProductsCards } from "../../components/products/ProductsCards";
import { ProductForm } from "../../components/products/ProductForm";
import type { ProductFormRef } from "../../components/products/ProductForm";
import type { Product } from "../../types/product";
import classes from "./Products.module.css";

export const Products = () => {
  const products = useLoaderData() as Product.Props[];
  const formRef = useRef<ProductFormRef>(null);
  const [productToEdit, setProductToEdit] = useState<Product.Props | undefined>(
    undefined
  );

  const handleAdd = () => {
    setProductToEdit(undefined);
    formRef.current?.open();
  };

  const handleEdit = (product: Product.Props) => {
    setProductToEdit(product);
    formRef.current?.open();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAdd}
        className={classes["add-button"]}
      >
        +
      </button>
      <ProductForm ref={formRef} productToEdit={productToEdit} />
      <ProductsCards products={products} onEdit={handleEdit} />
    </>
  );
};