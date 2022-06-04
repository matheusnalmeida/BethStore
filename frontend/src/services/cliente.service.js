import api from '../config/api'
import * as ROUTES from '../config/routes'

export default class ClienteService {
    static GetAllClientes = async () => {
        return api
            .get(ROUTES.GET_CLIENTES)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static GetCliente = async (id) => {
        return api
            .get(ROUTES.GET_CLIENTE(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static CreateCliente = async (cliente) => {
        return api
            .post(ROUTES.REGISTER_CLIENTE, cliente)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static UpdateCliente = async (id, cliente) => {
        return api
            .put(ROUTES.UPDATE_CLIENTE(id), cliente)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static DeleteCliente = async (id) => {
        return api
            .delete(ROUTES.DELETE_CLIENTE(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}