import React, { useState } from "react";
import styles from "../styles/main.module.css";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dane z formularza rejestracji:", formData);
        // Tu później fetch/axios do backendu
    };

    return (
        <main className={styles.main}>
            <h2>Rejestracja</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nazwa użytkownika"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Zarejestruj się</button>
            </form>
        </main>
    );
}

export default Register;
