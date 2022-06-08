import { BOLETO, CARTAO_CREDITO, PIX } from "../constants/forma-pagamento";


export default class PrazoEntregaService {
    static CalcularPrazoEntrega = (formaDePagamento) => {
        switch (formaDePagamento) {
            case PIX:
                return new Date().addDays(5)
            case BOLETO:
                return new Date().addDays(15)
            case CARTAO_CREDITO:
                return new Date().addDays(7)
            default:
                break;
        }
    }
}