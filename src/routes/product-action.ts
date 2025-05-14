import type { ActionFunctionArgs } from "react-router-dom";

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

  const product = {
    title: `${formData.get("title")} ${formData.get("aroma")}`,
    description: formData.get("description"),
    aroma: formData.get("aroma"),
    presentations,
  };

  const postProduct = {
    _id: formData.get("aroma"),
    ...product,
  };

  try {
    let response;

    if (method === "post") {
      response = await fetch(
        "https://mundo-gatuno-backend.onrender.com/api/products",
        {
          method: "POST",
          body: JSON.stringify(postProduct),
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (method === "put") {
      response = await fetch(
        `https://mundo-gatuno-backend.onrender.com/api/products/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(product),
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!response) {
      throw new Error("No hay respuestas del servidor");
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: "Error al crear el producto",
          details: data,
        },
      };
    }

    return { data, success: true };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Error inesperado al crear el producto",
        details:
          error instanceof Error
            ? { message: error.message }
            : { message: "Error desconocido" },
      },
    };
  }
};
