import api from '../config/api'

export default class ClienteService {
    static GetAllClientes = () => {
        api
        .get("cliente")
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
          console.error(err);
        });
    } 
}