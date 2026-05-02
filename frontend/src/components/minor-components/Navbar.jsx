import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import CurrentUser from "./CurrentUser";
import "./css/navbar.css";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // This prevents the page from jumping horizontally when the scrollbar disappears
      /* document.body.style.paddingRight = "0px"; */
    } else {
      document.body.style.overflow = "unset";
      /* document.body.style.paddingRight = "0px"; */
    }

    // Cleanup function in case component unmounts while open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      <nav className="navbar">
        <button
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger ${isOpen ? "open" : ""}`}></span>
        </button>

        <div className={`navlinks ${isOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/Dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          {user ? (
            <CurrentUser />
          ) : (
            <NavLink
              to="/Login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
