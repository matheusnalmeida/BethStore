const Pedido = (
    codigo = "",
    valor_total = "",
    produtos = [],
    cliente_codigo = "",
    previsao_entrega = "",
    valor_frete = "",
    forma_pagamento = ""
) => {
    return {  
        codigo: codigo,
        valor_total: valor_total,
        produtos: produtos,
        cliente_codigo: cliente_codigo,
        previsao_entrega: previsao_entrega,
        valor_frete: valor_frete,
        forma_pagamento: forma_pagamento
    }
}

export default Pedido;