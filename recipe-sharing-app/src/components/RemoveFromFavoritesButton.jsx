
import useRecipeStore from "./recipeStore";

const RemoveFromFavoritesButton = ({ id }) => {
    const removeFavorite = useRecipeStore(state => state.removeFavorite);
    const favorites = useRecipeStore(state => state.favorites);
    
    const isFavorite = favorites.includes(id);

    if (!isFavorite) {
        return null; 
    }

    return (
        <button onClick={() => removeFavorite(id)}>
            Remove from Favorites
        </button>
    );
};

export default RemoveFromFavoritesButton;