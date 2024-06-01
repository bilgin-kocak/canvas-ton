import axios from 'axios';

const backendUrl = 'http://localhost:3001';

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPlayer = async (walletAddress) => {
  try {
    const response = await api.post('/player', { walletAddress });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
};

export const getPlayer = async (walletAddress) => {
  console.log(walletAddress);
  console.log(api.baseURL + '/player/${walletAddress}');
  try {
    const response = await api.get(`/player/${walletAddress}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
};

export const updatePlayRights = async (walletAddress, playRights) => {
  try {
    const response = await api.post(`/player/${walletAddress}/playrights`, {
      playRights,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating play rights:', error);
    throw error;
  }
};

export const updateScore = async (walletAddress, score) => {
  try {
    const response = await api.post(`/player/${walletAddress}/score`, {
      score,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
};
