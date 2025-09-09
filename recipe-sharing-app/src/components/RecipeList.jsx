import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import AddToFavoritesButton from "./AddToFavoritesButton";
import RemoveFromFavoritesButton from "./RemoveFromFavoritesButton";
import { useEffect } from "react";

const RecipeList = () => {
    const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
    const filterRecipes = useRecipeStore(state => state.filterRecipes);
    const searchTerm = useRecipeStore(state => state.searchTerm);

    useEffect(() => {
        filterRecipes();
    }, [searchTerm, filterRecipes]);

    return (
        <div>
            {filteredRecipes.map(recipe => {
                const {id, title, description} = recipe;
                return (
                    <div key={id}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <Link to={`/${id}`}>Details</Link>
                        <AddToFavoritesButton id={id} />
                        <RemoveFromFavoritesButton id={id} />
                    </div>
                )
            })}
        </div>
    );
};

export default RecipeList;