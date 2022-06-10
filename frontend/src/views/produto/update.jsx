import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCircularProgress from '../../components/CustomCircularProgress';
import { useBlocking } from '../../hooks/useBlocking';
import ProdutoService from '../../services/produto.service';
import { showErrorMessage } from '../../utils/toast.utils';
import ProdutoForm from './common/produto-form';

const ProdutoUpdate = () => {
    const params = useParams();
    const [produtoFound, setProdutoFound] = useState();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        let produtoId = params.id;
        Blocking();
        ProdutoService.GetProduto(produtoId).then((result) => {
            if (result.success) {
                setProdutoFound(result.data)
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }, [params.id]);

    return (
        produtoFound
            ?
            <ProdutoForm
                isEdit={true}
                produtoProp={produtoFound}
            />
            :
            <CustomCircularProgress />
    );
}

export default ProdutoUpdate;