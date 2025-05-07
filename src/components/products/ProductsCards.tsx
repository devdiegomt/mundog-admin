import { useProducts } from "../../hooks/useProducts";
import classes from "./ProductsCards.module.css";

export const ProductsCards = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  console.log(products);

  return (
    <section className={classes["products-cards"]}>
      <h1>Arena disponible</h1>
      <ul className={classes["products-cards__list"]}>
        {products.map((product) => (
          <li
            key={product._id}
            className={classes["products-cards__list--item"]}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.aroma}</p>
           {/*  <ul>
              {product.weights.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul> */}
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
