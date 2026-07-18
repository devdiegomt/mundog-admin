import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import { deleteProduct } from "../../api/products";
import { logout } from "../../api/auth";
import classes from "./ProductsCards.module.css";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import type { Product } from "../../types/product";

function formatToCOP(number: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(number);
}

interface ProductsCardsProps {
  products: Product.Props[];
  onEdit: (product: Product.Props) => void;
}

export const ProductsCards = ({ products, onEdit }: ProductsCardsProps) => {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    const confirmed = window.confirm("¿Seguro que desea eliminar el producto?");
    if (!confirmed) return;

    setDeleteError(null);
    setDeletingId(id);

    try {
      const response = await deleteProduct(id);
      if (response.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      if (!response.ok) {
        throw new Error("Error al eliminar el producto.");
      }
      revalidator.revalidate();
    } catch (err: unknown) {
      setDeleteError(
        err instanceof Error ? err.message : "Error al eliminar el producto."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className={classes["products-cards"]}>
      <h1>Productos</h1>
      {deleteError && <p className={classes["delete-error"]}>{deleteError}</p>}
      {products.length === 0 ? (
        <p className={classes.empty}>
          No hay productos todavía. Agrega el primero con el botón +.
        </p>
      ) : (
        <ul className={classes["products-cards__list"]}>
          {products.map((product) => (
            <li
              key={product._id}
              className={classes["products-cards__list--item"]}
            >
              <div className={classes["products-cards__list--header"]}>
                <h2>{product.title}</h2>
                <div
                  className={classes["products-cards__list--header--actions"]}
                >
                  <img
                    src={editIcon}
                    alt="Editar producto"
                    onClick={() => onEdit(product)}
                  />
                  <img
                    src={deleteIcon}
                    alt="Eliminar producto"
                    style={
                      deletingId === product._id
                        ? { opacity: 0.4, pointerEvents: "none" }
                        : undefined
                    }
                    onClick={() => handleRemove(product._id)}
                  />
                </div>
              </div>
              <p>{product.description}</p>
              <p>Aroma: {product.aroma}</p>
              {product.presentations.map((presentation) => (
                <div key={presentation.weight} className={classes.presentation}>
                  <img
                    src={presentation.image}
                    alt={`${product.title} ${presentation.weight}`}
                    className={classes["products-cards__list--image"]}
                  />
                  <div>
                    <b>{presentation.weight}</b> ·{" "}
                    <b>{formatToCOP(presentation.price)}</b>
                    <br />
                    Cantidad: {presentation.quantity}
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
