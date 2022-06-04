import React from 'react';
import Produto from '../../models/produto';
import ProdutoForm from './common/produto-form';

const ProdutoRegister = () => {
    return (
        <ProdutoForm
            isEdit={false}
            produtoProp={Produto()}
        />  
    );
}

export default ProdutoRegister;