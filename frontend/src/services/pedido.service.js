import api from '../config/api'
import * as ROUTES from '../config/routes'

export default class ClienteService {
    static GetAllPedidos = async () => {
        return api
            .get(ROUTES.GET_PEDIDOS)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static GetPedido = async (id) => {
        return api
            .get(ROUTES.GET_PEDIDO(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static CreatePedido = async (pedido) => {
        return api
            .post(ROUTES.REGISTER_PEDIDO, pedido)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}