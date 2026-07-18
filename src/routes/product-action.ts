import type { ActionFunctionArgs } from "react-router-dom";
import { createProduct, updateProduct } from "../api/products";

export const productFormAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = formData.get("_method");
  const weights = formData.getAll("weight[]");
  const prices = formData.getAll("price[]");
  const quantities = formData.getAll("quantity[]");
  const images = formData.getAll("image[]");

  const presentations = weights.map((_, i) => ({
    weight: weights[i],
    price: Number(prices[i]),
    quantity: Number(quantities[i]),
    image: images[i],
  }));

  // Validación: los inputs hidden no validan en HTML, así que validamos acá.
  if (presentations.length === 0) {
    return {
      success: false,
      error: { message: "Agrega al menos una presentación." },
    };
  }

  const incomplete = presentations.some(
    (p) => !p.weight || !p.image || p.price <= 0
  );
  if (incomplete) {
    return {
      success: false,
      error: {
        message:
          "Cada presentación necesita peso, precio mayor a 0 e imagen (aroma) seleccionada.",
      },
    };
  }

  const product = {
    title: `${formData.get("title")} ${formData.get("aroma")}`,
    description: formData.get("description"),
    aroma: formData.get("aroma"),
    presentations,
  };

  try {
    const response =
      method === "put" && params.id
        ? await updateProduct(params.id, product)
        : await createProduct(product);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: {
          message:
            response.status === 401 || response.status === 403
              ? "Tu sesión expiró. Vuelve a iniciar sesión."
              : "Error al guardar el producto.",
          details: data,
          sessionExpired: response.status === 401 || response.status === 403,
        },
      };
    }

    // Al retornar desde un action, React Router revalida el loader:
    // la lista se actualiza sola, sin recargar la página.
    return { data, success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Error inesperado al guardar el producto.",
        details:
          error instanceof Error
            ? { message: error.message }
            : { message: "Error desconocido" },
      },
    };
  }
};
