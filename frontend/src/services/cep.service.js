import apiCep from '../config/cep-api'
import * as ROUTES from '../config/routes'
import { onlyNumberMask } from '../utils/mask.utils';

export default class CEPService {
    static GetCEPInfo = async (cep) => {
        let validCep = onlyNumberMask(cep)
        return apiCep
            .get(ROUTES.GET_CEP_INFO(validCep))
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}