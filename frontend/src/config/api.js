import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = process.env.REACT_APP_API_URL;

api.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

//axiosClient.defaults.timeout = 2000;

//axiosClient.defaults.withCredentials = true;

export default api;