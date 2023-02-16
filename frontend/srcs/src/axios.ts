import Cookies from "js-cookie";
import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = Cookies.get("access_token");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();
