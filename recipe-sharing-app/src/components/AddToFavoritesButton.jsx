
import useRecipeStore from "./recipeStore";

const AddToFavoritesButton = ({ id }) => {
    const addFavorite = useRecipeStore(state => state.addFavorite);
    const favorites = useRecipeStore(state => state.favorites);
    
    const isFavorite = favorites.includes(id);

    if (isFavorite) {
        return null; 
    }

    return (
        <button onClick={() => addFavorite(id)}>
            Add to Favorites
        </button>
    );
};

export default AddToFavoritesButton;