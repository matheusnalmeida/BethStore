import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoriaService from '../../services/categoria.service';
import { showErrorMessage } from '../../utils/toast.utils';
import CategoriaForm from './common/categoria-form';
import CustomCircularProgress from '../../components/CustomCircularProgress';
import { useBlocking } from '../../hooks/useBlocking';

const CategoriaUpdate = () => {
    const params = useParams();
    const [categoriaFound, setCategoriaFound] = useState();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        let categoriaId = params.id;
        Blocking()
        CategoriaService.GetCategoria(categoriaId).then((result) => {
            if (result.success) {
                setCategoriaFound(result.data)
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }, [params.id]);

    return (
        categoriaFound
            ?
            <CategoriaForm
                isEdit={true}
                categoriaProp={categoriaFound}
            />
            :
            <CustomCircularProgress />
    );
}

export default CategoriaUpdate;