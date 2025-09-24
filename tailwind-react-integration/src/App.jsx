function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind CSS + React
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Successfully integrated! 🎉
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App