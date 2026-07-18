const API_URL =
  import.meta.env.VITE_API_URL ?? "https://mundo-gatuno-backend.onrender.com";

const TOKEN_KEY = "mg_admin_token";

export const login = async (password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "No se pudo iniciar sesión");
  }

  sessionStorage.setItem(TOKEN_KEY, data.token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);

export const isLoggedIn = (): boolean => !!getToken();
