import axios from 'axios';

const GITHUB_API_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};