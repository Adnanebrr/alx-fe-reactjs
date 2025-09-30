import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.summary}</p>
        <Link 
          to={`/recipe/${recipe.id}`}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition block text-center"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;