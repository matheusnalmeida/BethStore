export const cpfValid = (cpf) => {
    console.log(cpf)
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