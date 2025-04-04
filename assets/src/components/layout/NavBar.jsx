// assets/src/components/layout/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Assure-toi d'avoir le CSS adéquat

const NavBar = () => {
    // Vérifier si un mode est stocké dans localStorage
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "light-mode";
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Logo ajouté ici */}
                <Link to="/">
                    <img
                        src="/assets/images/logo.png"
                        alt="TrivialApps Logo"
                        className="logo"
                    />
                </Link>
            </div>
            <div className="navbar-right">
                <button onClick={toggleDarkMode} className="dark-mode-toggle">
                    {darkMode ? "Mode Clair" : "Mode Sombre"}
                </button>
                {/* Autres liens, ex. Login, Dashboard */}
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    );
};

export default NavBar;
