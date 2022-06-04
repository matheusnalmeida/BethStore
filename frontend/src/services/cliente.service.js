import api from '../config/api'
import { GET_CLIENTES } from '../config/routes'

export default class ClienteService {
    static GetAllClientes = () => {
        api
        .get(GET_CLIENTES)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    } 
}