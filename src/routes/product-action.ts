import type { ActionFunctionArgs } from "react-router-dom";

export const productFormAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = formData.get("_method");

  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    aroma: formData.get("aroma"),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
    image: formData.get("image"),
    weights: formData.getAll("weights"),
  };

  const postProduct = {
    _id: Math.floor(Math.random() * 100000).toString(),
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
      throw new Error(data.message || "Error al crear el producto");
    }

    return { data, success: true };
  } catch (error) {
    console.error(error);
    return {
      error:
        (error instanceof Error ? error.message : "Error desconocido") ||
        "Error al crear el producto",
    };
  }
};
