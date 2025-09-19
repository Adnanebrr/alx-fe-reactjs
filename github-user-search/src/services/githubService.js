import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const advancedSearchUsers = async (params) => {
  try {
    const { username, location, minRepos, page = 1, per_page = 10 } = params;
    
    let query = '';
    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;
    
    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error in advanced search:', error);
    throw error;
  }
};

export const getUsersDetails = async (usernames) => {
  try {
    const userDetails = await Promise.all(
      usernames.map(async (username) => {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
        return response.data;
      })
    );
    return userDetails;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};