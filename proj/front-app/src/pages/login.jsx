import React, { useState } from "react";
import styles from "../styles/main.module.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dane z formularza logowania:", formData);
        // Tu później fetch/axios do backendu
    };

    return (
        <main className={styles.main}>
            <h2>Logowanie</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Zaloguj się</button>
            </form>
        </main>
    );
}

export default Login;
