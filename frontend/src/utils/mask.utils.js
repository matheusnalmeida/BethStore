export const onlyNumberMask = value => {
    return value
        .replace(/\D/g, '')
}

export const cpfMask = value => {
    return onlyNumberMask(value)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export const cepMask = value => {
    return onlyNumberMask(value)
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
}

export const phoneMask = (value) => {
    const phoneSize = value.length;
    var valueCurrrent = onlyNumberMask(value)
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2');

    if (phoneSize >= 15) {
        valueCurrrent = valueCurrrent.replace(/(\d{5})(\d{4})/, '$1-$2')
    } else {
        valueCurrrent = valueCurrrent.replace(/(\d{4})(\d{4})/, '$1-$2')
    }
    valueCurrrent = valueCurrrent.replace(/(-\d{4})\d+?$/, '$1');
    return valueCurrrent
};

export const priceMask = (price) => {
    return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export const numberFormatInputMask = (price) => {
    if (price.length === 0) {
        return ''
    }
    return parseFloat(price.replace(/[^0-9|.]/g, ""))
}

export const brasilianDateMask = (date) => {
    let day = date.getDate().toString();
    let dayF = (day.length === 1) ? '0' + day : day;
    let month = (date.getMonth() + 1).toString();
    let monthF = (month.length === 1) ? '0' + month : month;
    let yearF = date.getFullYear();
    return dayF + "/" + monthF + "/" + yearF;
}