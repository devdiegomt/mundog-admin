import type { ActionFunctionArgs } from "react-router-dom";

export async function productAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const product = {
    _id: Math.random().toString(36).substring(7),
    title: formData.get("title"),
    description: formData.get("description"),
    aroma: formData.get("aroma"),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("stock")),
    image: formData.get("image"),
    weights: formData.getAll("weights"),
  };

  try {
    const response = await fetch("https://mundo-gatuno-backend.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }

    return;
    /* return redirect("/"); */
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}
