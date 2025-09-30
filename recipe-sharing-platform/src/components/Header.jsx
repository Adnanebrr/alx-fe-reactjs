import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">🍳 RecipeShare</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-green-200 transition">Home</Link></li>
              <li><Link to="/add-recipe" className="hover:text-green-200 transition">Add Recipe</Link></li>
              <li><a href="#" className="hover:text-green-200 transition">Favorites</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;