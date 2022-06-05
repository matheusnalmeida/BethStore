import apiCep from '../config/cep-api'
import * as ROUTES from '../config/routes'

export default class CEPService {
    static GetCEPInfo = async (cep) => {
        return apiCep
            .get(ROUTES.GET_CEP_INFO(cep))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}