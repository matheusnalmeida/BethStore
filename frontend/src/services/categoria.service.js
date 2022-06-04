import api from '../config/api'
import { GET_CATEGORIAS, DELETE_CATEGORIA } from '../config/routes'

export default class CategoriaService {
    static GetAllCategorias = async () => {
        return api
            .get(GET_CATEGORIAS)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static DeleteCategorias = async (id) => {
        return api
            .delete(DELETE_CATEGORIA(id))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}