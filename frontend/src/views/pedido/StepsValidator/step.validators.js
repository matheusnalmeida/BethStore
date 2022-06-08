export const ClientePedidoValid = (pedido) => {
    return !!pedido.cliente_codigo && !!pedido.valor_frete;
}

export const FormaPagamentoValid = (pedido) => {
    return !!pedido.forma_pagamento && 
    !!pedido.previsao_entrega && 
    !!pedido.valor_total;
}