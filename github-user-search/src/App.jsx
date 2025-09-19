import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { searchUsers } from './services/githubApi';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchUsers(query);
      setUsers(data.items);
    } catch (err) {
      setError('Failed to search users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      <UserList users={users} />
    </div>
  );
}

export default App;
