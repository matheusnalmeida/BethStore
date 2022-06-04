import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCircularProgress from '../../components/CustomCircularProgress';
import ClienteService from '../../services/cliente.service';
import { showErrorMessage } from '../../utils/toast.utils';
import ClienteForm from './common/cliente-form';

const ClienteUpdate = () => {
    const params = useParams();
    const [clienteFound, setClienteFound] = useState();

    useEffect(() => {
        let clienteId = params.id;
        ClienteService.GetCliente(clienteId).then((result) => {
            if (result.success) {
                setClienteFound(result.data)
                return;
            }
            showErrorMessage(result.message)
        });
    }, [params.id]);

    return (
        clienteFound
            ?
            <ClienteForm
                isEdit={true}
                clienteProp={clienteFound}
            />
            :
            <CustomCircularProgress />
    );
}

export default ClienteUpdate;