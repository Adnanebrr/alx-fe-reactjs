import { useState } from 'react';
import { fetchUserData } from '../services/githubApi';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {userData && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
            width="100"
          />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio || 'No bio available'}</p>
          <p>Followers: {userData.followers} | Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="profile-link"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;