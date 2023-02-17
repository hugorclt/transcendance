import axios from 'axios';

export const axiosClient = () => {
  // Set the automatic cookies for any request
  axios.defaults.withCredentials = true

  //default get options
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default axiosClient();
