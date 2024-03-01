import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';
export const fetchImages = async searchQuery => {
  try {
    const response = await axios.get(`/search/photos`, {
      params: {
        query: searchQuery,
      },
      headers: {
        Authorization: 'Client_ID Z_AJ42tCYRi9ez9R3kTo14ZRpWfnHT2xNXTyYUKcP6Q',
        'Accept-Version': 'v1',
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};
