import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                🍽️ Moje Przepisy
            </Link>
            <div className={styles.navRight}>
            <Link to="/login" className={styles.registerButton}>
                    Logowanie
                </Link>
                <Link to="/register" className={styles.registerButton}>
                    Rejestracja
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
