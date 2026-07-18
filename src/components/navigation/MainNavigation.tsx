import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logoImg from "../../assets/logo.png";
import { logout } from "../../api/auth";

export const MainNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.brand}>
          <img src={logoImg} alt="Mundo Gatuno" className={classes.logo} />
          <span className={classes.title}>Admin</span>
        </Link>
        <button type="button" onClick={handleLogout} className={classes.logout}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};
