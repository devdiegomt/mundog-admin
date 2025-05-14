import { useRef, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ProductForm } from "./ProductForm";
import type { ProductFormRef } from "./ProductForm";
import classes from "./ProductsCards.module.css";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import type { Product } from "../../types/product";

export const ProductsCards = () => {
  const { products, loading, error } = useProducts();
  const formRef = useRef<ProductFormRef>(null);
  const [productToEdit, setProductToEdit] = useState<Product.Props | undefined>(
    undefined
  );

  const handleRemove = async (id: string) => {
    const confirm = window.confirm("¿Seguro que desea eliminar el producto?");
    if (!confirm) return;

    const response = await fetch(
      `https://mundo-gatuno-backend.onrender.com/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Producto eliminado con éxito");
      location.reload();
    } else {
      alert("Error al eliminar el producto");
    }
  };

  const handleEdit = (product: Product.Props) => {
    setProductToEdit(product);
    formRef.current?.open();
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={classes["products-cards"]}>
      <h1>Arena disponible</h1>
      <ul className={classes["products-cards__list"]}>
        {products.map((product) => (
          <li
            key={product._id}
            className={classes["products-cards__list--item"]}
          >
            <div className={classes["products-cards__list--header"]}>
              <h2>{product.title}</h2>
              <div className={classes["products-cards__list--header--actions"]}>
                <img
                  src={editIcon}
                  alt="Edit Icon"
                  onClick={() => handleEdit(product)}
                />
                <img
                  src={deleteIcon}
                  alt="Remove icon"
                  onClick={() => handleRemove(product._id)}
                />
              </div>
            </div>
            <p>Descripción: {product.description}</p>
            <p>Aroma: {product.aroma}</p>
            {product.presentations.map((presentation) => (
              <p key={presentation.weight}>
                Precio: {presentation.price}
                <br />
                Cantidad: {presentation.quantity}
                <br />
                Peso: {presentation.weight}
                <br />
                Imagen:
                <br />
                <img
                  src={presentation.image}
                  alt={product.title}
                  className={classes["products-cards__list--image"]}
                />
              </p>
            ))}
          </li>
        ))}
      </ul>
      <ProductForm ref={formRef} productToEdit={productToEdit} />
    </section>
  );
};
