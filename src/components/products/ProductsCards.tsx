import { useProducts } from "../../hooks/useProducts";
import classes from "./ProductsCards.module.css";
import deleteIcon from "../../assets/delete.png";

export const ProductsCards = () => {
  const { products, loading, error } = useProducts();

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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  console.log(products);

  return (
    <section className={classes["products-cards"]}>
      <ul className={classes["products-cards__list"]}>
        {products.map((product) => (
          <li
            key={product._id}
            className={classes["products-cards__list--item"]}
          >
            <div className={classes["products-cards__list--header"]}>
              <h1>Arena disponible</h1>
              <img
                src={deleteIcon}
                alt="Remove icon"
                onClick={() => handleRemove(product._id)}
              />
            </div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.aroma}</p>
            <p>{product.weightKg} kg</p>
            <img
              src={product.image}
              alt={product.title}
              className={classes["products-cards__list--image"]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
