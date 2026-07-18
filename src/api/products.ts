import type { Product } from "../types/product";
import { getToken } from "./auth";

/**
 * Configuración por variables de entorno (.env):
 *   VITE_API_URL=https://mundo-gatuno-backend.onrender.com
 */
const API_URL =
  import.meta.env.VITE_API_URL ?? "https://mundo-gatuno-backend.onrender.com";

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async (
  signal?: AbortSignal
): Promise<Product.Props[]> => {
  const response = await fetch(`${API_URL}/api/products`, { signal });
  if (!response.ok) {
    throw new Error(`Error al obtener productos (${response.status})`);
  }
  return response.json();
};

export const createProduct = async (product: unknown) => {
  return fetch(`${API_URL}/api/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
};

export const updateProduct = async (id: string, product: unknown) => {
  return fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
};

export const deleteProduct = async (id: string) => {
  return fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
};
