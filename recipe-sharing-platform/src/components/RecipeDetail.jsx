import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find recipe by ID
    const foundRecipe = recipeData.find(recipe => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <Link to="/" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{recipe.summary}</p>
          </div>
        </div>

        {/* Recipe Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Ingredient 1 for {recipe.title}</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Ingredient 2 for {recipe.title}</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Ingredient 3 for {recipe.title}</span>
              </li>
            </ul>
          </div>

          {/* Instructions Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="pb-2 border-b border-gray-100">Step 1: Prepare ingredients for {recipe.title}</li>
              <li className="pb-2 border-b border-gray-100">Step 2: Cook according to traditional methods</li>
              <li className="pb-2 border-b border-gray-100">Step 3: Serve and enjoy your {recipe.title}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;