import api from '../config/api'
import * as ROUTES from '../config/routes'

export default class FreteService {
    static CalcularFrete = async (cep, produtos) => {
        return api
        .post(ROUTES.CALCULAR_FRETE(cep), produtos)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(err);
        });
    }
}