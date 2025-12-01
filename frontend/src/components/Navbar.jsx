import { Link } from "react-router-dom";
import GreetUser from "./minor-components/GreetUser";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Dashboard">Dashboard</Link>
      </div>

      <GreetUser />
    </nav>
  );
};
export default Navbar;
