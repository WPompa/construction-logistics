import { Link } from "react-router-dom";
import CurrentUser from "./minor-components/CurrentUser";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Dashboard">Dashboard</Link>
      </div>

      <CurrentUser />
    </nav>
  );
};
export default Navbar;
