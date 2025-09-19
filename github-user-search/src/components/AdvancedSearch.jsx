import { useState } from 'react';
import { advancedSearchUsers, getUsersDetails } from '../services/githubService';

const AdvancedSearch = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (newPage = 1) => {
    if (!searchParams.username && !searchParams.location && !searchParams.minRepos) {
      setError('Please enter at least one search criteria');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await advancedSearchUsers({ ...searchParams, page: newPage });
      
      // Get detailed information for each user
      const usernames = data.items.map(user => user.login);
      const userDetails = await getUsersDetails(usernames);
      
      if (newPage === 1) {
        setUsers(userDetails);
      } else {
        setUsers(prev => [...prev, ...userDetails]);
      }
      
      setHasMore(data.items.length === 10); // GitHub returns max 100 items per page
      setPage(newPage);
    } catch (err) {
      setError('Error searching users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(page + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Advanced GitHub User Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="e.g., New York"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => handleSearch(1)}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Users'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Results */}
      {users.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Search Results ({users.length} users found)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{user.name || user.login}</h4>
                    <p className="text-gray-600">@{user.login}</p>
                    {user.location && (
                      <p className="text-sm text-gray-600">📍 {user.location}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      📦 {user.public_repos} repositories
                    </p>
                    <p className="text-sm text-gray-600">
                      👥 {user.followers} followers • {user.following} following
                    </p>
                  </div>
                </div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {users.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600 py-8">
          <p>Enter search criteria to find GitHub users</p>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;