import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import styles from './styles/main.module.css';
import Navbar from './components/navbar.jsx'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx';


// Mockowane dane
const mockRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Klasyczny włoski makaron z boczkiem i serem.",
        details: "Ugotuj makaron, podsmaż boczek, dodaj jajka i parmezan.",
        image: "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-mediumSquareAt3X-v2.jpg",
    },
    {
        id: 2,
        title: "Zupa pomidorowa",
        description: "Domowa zupa pomidorowa z makaronem lub ryżem.",
        details: "Podsmaż cebulę, dodaj pomidory, przyprawy i gotuj 20 minut.",
        image: "https://cdn.aniagotuje.com/pictures/articles/2018/06/105810-v-1000x1000.jpg",
    },
    {
        id: 3,
        title: "Pizza Margherita",
        description: "Klasyczna pizza z sosem pomidorowym, mozzarellą i bazylią.",
        details: "Przygotuj ciasto, dodaj sos, mozzarellę i bazylię. Piecz przez 10 minut.",
        image: "https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format",
    },
];

// Komponent paska nawigacyjnego

// Widok listy przepisów
function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(mockRecipes);
    }, []);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Lista przepisów</h1>
            <div className={styles.recipeList}>
                {recipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id} className={styles.recipeCard}>
                        {recipe.image && (
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className={styles.recipeImage}
                            />
                        )}
                        <div className={styles.recipeDetails}>
                            <h2 className={styles.recipeTitle}>{recipe.title}</h2>
                            <p className={styles.recipeDescription}>{recipe.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

// Widok szczegółów przepisu
function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = mockRecipes.find((r) => r.id === parseInt(id));

    if (!recipe) return <main className={styles.main}><p>Nie znaleziono przepisu.</p></main>;

    return (
        <main className={styles.main}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>← Wróć</button>
            <h2>{recipe.title}</h2>
            <p>{recipe.details}</p>
            {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className={styles.modalImage} />
            )}
        </main>
    );
}

// Główna aplikacja z routingiem
export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
