import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { fetchUserData } from './services/githubService'; 
import './App.css';

function App() {
    const [userData, setUserData] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (username) => { 
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setUserData(null); 

        try {
            const data = await fetchUserData(username); 
            setUserData(data); 
        } catch (err) {
            setError('Looks like we cant find the user'); 
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
            
            {/* Display single user data instead of list */}
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
}

export default App;