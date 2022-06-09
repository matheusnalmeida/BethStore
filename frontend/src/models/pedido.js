import Aprovacao from "./aprovacao";
import Cliente from "./cliente";

const Pedido = (
    codigo = "",
    valor_total = "",
    produtos = [],
    cliente_codigo = "",
    cliente = Cliente(),
    previsao_entrega = "",
    valor_frete = "",
    forma_pagamento = "",
    aprovacao = Aprovacao()
) => {
    return {  
        codigo: codigo,
        valor_total: valor_total,
        produtos: produtos,
        cliente_codigo: cliente_codigo,
        cliente: cliente,
        previsao_entrega: previsao_entrega,
        valor_frete: valor_frete,
        forma_pagamento: forma_pagamento,
        aprovacao: aprovacao
    }
}

export default Pedido;