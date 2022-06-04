import React from 'react';
import Categoria from '../../models/categoria';
import CategoriaForm from './common/categoria-form';

const CategoriaRegister = () => {
   
    return (
        <CategoriaForm
            isEdit={false}
            categoriaProp={Categoria()}
        />  
    );
}

export default CategoriaRegister;