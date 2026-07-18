import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import logoImg from "../../assets/logo.png";
import classes from "./Login.module.css";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.card}>
        <img src={logoImg} alt="Mundo Gatuno" className={classes.logo} />
        <h1 className={classes.title}>Panel de administración</h1>
        <label htmlFor="password" className={classes.label}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.input}
          autoFocus
          required
        />
        {error && <p className={classes.error}>{error}</p>}
        <button type="submit" className={classes.button} disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
};
