import { useState } from 'react';
import { create } from 'zustand';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';


const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish made with egg, hard cheese, cured pork, and black pepper.' },
    { id: 2, title: 'Chicken Tikka Masala', description: 'A popular dish of roasted chunks of chicken in a spiced curry sauce.' },
  ],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
}));


const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Recipes</h1>
      <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        Add New Recipe
      </Link>
      <div className="mt-6 space-y-4">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-between items-center">
              <div>
                <Link to={`/recipes/${recipe.id}`} className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                  {recipe.title}
                </Link>
                <p className="text-gray-600 mt-2">{recipe.description.substring(0, 100)}...</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes found. Start by adding one!</p>
        )}
      </div>
    </div>
  );
};

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && description) {
      addRecipe({ id: Date.now(), title, description });
      navigate('/');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Add Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const EditRecipeForm = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const recipeToEdit = useRecipeStore(state => state.recipes.find(r => r.id === parseInt(recipeId)));

  const [title, setTitle] = useState(recipeToEdit?.title || '');
  const [description, setDescription] = useState(recipeToEdit?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeToEdit && title && description) {
      updateRecipe({ id: recipeToEdit.id, title, description });
      navigate(`/recipes/${recipeId}`);
    }
  };

  if (!recipeToEdit) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-3xl font-bold">Recipe Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate(`/recipes/${recipeId}`)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [showModal, setShowModal] = useState(false);

  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(recipeId))
  );

  const handleDelete = () => {
    deleteRecipe(parseInt(recipeId));
    navigate('/');
  };

  if (!recipe) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-3xl font-bold">Recipe Not Found</h1>
        <button onClick={() => navigate('/')} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{recipe.title}</h1>
        <p className="text-gray-700 text-lg leading-relaxed">{recipe.description}</p>
        <div className="mt-8 flex space-x-4">
          <Link to={`/edit/${recipe.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Edit Recipe
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Delete Recipe
          </button>
          <button onClick={() => navigate('/')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Back to List
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 bg-white rounded-lg shadow-xl max-w-sm mx-auto">
            <p className="text-center text-lg mb-4">Are you sure you want to delete this recipe?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Confirm Delete
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans">
        <nav className="bg-white shadow-md p-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Recipe App
          </Link>
        </nav>
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            <Route path="/edit/:recipeId" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
