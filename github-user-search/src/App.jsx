import { useState } from 'react';
import Search from './components/Search';
import { advancedSearchUsers, getUsersDetails } from './services/githubService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (params) => {
    if (!params.username && !params.location && !params.minRepos) {
      setError('Please enter at least one search criteria');
      return;
    }

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const data = await advancedSearchUsers(params);
      
      // Get detailed information for each user
      const usernames = data.items.map(user => user.login);
      const userDetails = await getUsersDetails(usernames);
      
      setUsers(userDetails);
    } catch (err) {
      setError('Error searching users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {/* Display multiple users with .map() */}
      {users.length > 0 && (
        <div className="users-results">
          <h2>Search Results ({users.length} users found)</h2>
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <img 
                  src={user.avatar_url} 
                  alt={user.login} 
                  className="avatar"
                  width="100"
                />
                <h3>{user.name || user.login}</h3>
                {user.location && <p>📍 {user.location}</p>}
                <p>📦 {user.public_repos} repositories</p>
                <p>👥 {user.followers} followers | {user.following} following</p>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;