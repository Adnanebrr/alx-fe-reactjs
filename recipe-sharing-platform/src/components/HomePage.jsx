import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import recipeData from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 hover:text-green-600 transition-colors">
            Delicious Recipes
          </h1>
          <p className="text-xl text-gray-600">
            Discover and share amazing recipes from around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;