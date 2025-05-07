import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logoImg from "../../assets/logo.png";

export const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes["header__navigation"]}>
        <img
          src={logoImg}
          alt="Mundo Gatuno Logo"
          className={classes["header__navigation--logo"]}
        />
        <ul className={classes["header__navigation--list"]}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
