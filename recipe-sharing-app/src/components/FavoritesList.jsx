
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
    const favorites = useRecipeStore(state => 
        state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
    );

    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                favorites.map(recipe => (
                    recipe ? ( 
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                        </div>
                    ) : null
                ))
            )}
        </div>
    );
};

export default FavoritesList;