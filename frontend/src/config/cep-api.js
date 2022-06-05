import axios from 'axios';

const apiCep = axios.create();

apiCep.defaults.baseURL = 'https://viacep.com.br/ws';

apiCep.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export default apiCep;