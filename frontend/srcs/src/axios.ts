import axios from "axios";

export const axiosClient = () => {
  //default get options
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the automatic cookies for any request
  instance.defaults.withCredentials = true;

  return instance;
};

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
