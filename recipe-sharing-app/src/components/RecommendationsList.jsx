
import useRecipeStore from "./recipeStore";
import { useEffect } from "react";

const RecommendationsList = () => {
    const recommendations = useRecipeStore(state => state.recommendations);
    const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
    const favorites = useRecipeStore(state => state.favorites);

    useEffect(() => {
        if (favorites.length > 0) {
            generateRecommendations();
        }
    }, [favorites, generateRecommendations]);

    return (
        <div>
            <h2>Recommended For You</h2>
            {recommendations.length === 0 ? (
                <p>Add some favorites to get recommendations!</p>
            ) : (
                recommendations.map(recipe => (
                    <div key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecommendationsList;