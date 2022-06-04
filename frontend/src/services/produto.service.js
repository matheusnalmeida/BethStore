import api from '../config/api'
import * as ROUTES from '../config/routes'

export default class ProdutoService {
    static GetAllProdutos = async () => {
        return api
            .get(ROUTES.GET_PRODUTOS)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static GetProduto = async (id) => {
        return api
            .get(ROUTES.GET_PRODUTO(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static CreateProduto = async (produto) => {
        return api
            .post(ROUTES.REGISTER_PRODUTO, produto)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static UpdateProduto = async (id, produto) => {
        return api
            .put(ROUTES.UPDATE_PRODUTO(id), produto)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static DeleteProduto = async (id) => {
        return api
            .delete(ROUTES.DELETE_PRODUTO(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}