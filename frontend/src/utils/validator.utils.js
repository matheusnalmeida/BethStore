import CEPService from "../services/cep.service";
import { onlyNumberMask } from "./mask.utils";

export const cpfValid = (cpf) => {
    return cpf.length === 14;
}

export const cepValid = (cep) => {
    return cep.length === 9;
}

export const emailValid = (email) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const phoneValid = (phone) => {
    return phone.length === 14 || phone.length === 15;
}

export const cepExists = (cep) => {
    let validCep = onlyNumberMask(cep)
    return CEPService.GetCEPInfo(validCep).then((result) => {
        return !result.erro
    })
}