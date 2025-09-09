import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import useRecipeStore from './components/recipeStore';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path='/'
          element={
            <>
              <SearchBar />
              <RecipeList />
              <AddRecipeForm />
              <FavoritesList />
              <RecommendationsList />
            </>
          }
        />
        {recipes.map(recipe => {
          const recipeId = recipe.id;
          return (
            <Route
              path={`/${recipeId}`}
              element={<RecipeDetails recipeId={recipeId} />}
              key={recipeId}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App


