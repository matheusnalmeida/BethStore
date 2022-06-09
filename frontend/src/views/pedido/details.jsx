import { Card, CardContent } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Produto from '../../models/produto';
import PedidoService from '../../services/pedido.service'
import { brasilianDateMaskFromUTCString } from '../../utils/mask.utils';
import { showErrorMessage } from '../../utils/toast.utils';
import ResumoAprovacao from './components/ResumoAprovacao';
import ResumoPedidoStep from './Steps/ResumoPedidoStep';

function PedidoDetails() {
    const params = useParams();
    const [pedidoFound, setPedidoFound] = useState();

    useEffect(() => {
        let pedidoId = params.id;
        PedidoService.GetPedido(pedidoId).then((result) => {
            if (result.success) {
                formatObject(result.data)
                setPedidoFound(result.data)
                return;
            }
            showErrorMessage(result.message)
        });
    }, [params.id]);

    const formatObject = (pedido) => {
        pedido.previsao_entrega = brasilianDateMaskFromUTCString(pedido.previsao_entrega)
    }

    return (
        pedidoFound &&
        <Container
            sx={{
                padding: '25px'
            }}
        >
            <Card>
                <CardContent>
                    <ResumoPedidoStep
                        produtos={pedidoFound.produtos_pedido.map(produtoPedido => {
                            let produto = produtoPedido.produto;
                            return Produto(
                                produto.codigo,
                                produto.marca,
                                produto.modelo,
                                produtoPedido.preco,
                                produto.estoque,
                                produtoPedido.tamanho,
                                produto.descricao,
                                produto.categoria_codigo,
                                produto.categoria,
                                produtoPedido.quantidade,
                                produto.ativo
                            )
                        })}
                        pedido={pedidoFound} />
                    <ResumoAprovacao 
                        aprovacao={pedidoFound.aprovacao}
                    />
                </CardContent>
            </Card>
        </Container>
    )
}

export default PedidoDetails