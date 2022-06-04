import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCircularProgress from '../../components/CustomCircularProgress';
import ProdutoService from '../../services/produto.service';
import { showErrorMessage } from '../../utils/toast.utils';
import ProdutoForm from './common/produto-form';

const ProdutoUpdate = () => {
    const params = useParams();
    const [produtoFound, setProdutoFound] = useState();

    useEffect(() => {
        let produtoId = params.id;
        ProdutoService.GetProduto(produtoId).then((result) => {
            if (result.success) {
                setProdutoFound(result.data)
                return;
            }
            showErrorMessage(result.message)
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