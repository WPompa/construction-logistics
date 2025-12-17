import { NavLink } from "react-router-dom";
import CurrentUser from "./CurrentUser";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navlinks">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/Login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>

        <NavLink
          to="/Dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
      </div>

      <CurrentUser />
    </nav>
  );
};
export default Navbar;
