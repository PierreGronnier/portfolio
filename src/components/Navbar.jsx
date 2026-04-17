import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "../styles/navbar.css";

const Navbar = ({ visible = false }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!visible) return null;

  return (
    <nav className={`navbar ${visible ? "visible" : ""}`}>
      <div className="navbar-container">
        <a href="#hero" className="logo">
          PG
        </a>
        <ul className="nav-menu">
          <li>
            <a href="#projects" className="nav-link">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
          <li>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
