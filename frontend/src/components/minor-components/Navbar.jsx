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
    } else {
      document.body.style.overflow = "unset";
    }

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
          aria-expanded={isOpen}
        >
          <span className={`hamburger ${isOpen ? "open" : ""}`}></span>
        </button>

        <div className={`navlinks ${isOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            onClick={() => closeMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/Dashboard"
            onClick={() => closeMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          {!user && (
            <NavLink
              to="/Login"
              onClick={() => closeMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          )}
        </div>

        <div className={`user-container ${isOpen ? "nav-open" : ""}`}>
          {user && <CurrentUser closeMenu={closeMenu} />}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
