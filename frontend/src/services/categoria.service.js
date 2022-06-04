import api from '../config/api'
import * as ROUTES from '../config/routes'

export default class CategoriaService {
    static GetAllCategorias = async () => {
        return api
            .get(ROUTES.GET_CATEGORIAS)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static GetCategoria = async (id) => {
        return api
            .get(ROUTES.GET_CATEGORIA(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static CreateCategoria = async (categoria) => {
        return api
            .post(ROUTES.REGISTER_CATEGORIA, categoria)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static UpdateCategoria = async (id, categoria) => {
        return api
            .put(ROUTES.UPDATE_CATEGORIA(id), categoria)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static DeleteCategoria = async (id) => {
        return api
            .delete(ROUTES.DELETE_CATEGORIA(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}