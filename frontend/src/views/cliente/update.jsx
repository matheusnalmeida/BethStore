import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCircularProgress from '../../components/CustomCircularProgress';
import { useBlocking } from '../../hooks/useBlocking';
import ClienteService from '../../services/cliente.service';
import { showErrorMessage } from '../../utils/toast.utils';
import ClienteForm from './common/cliente-form';

const ClienteUpdate = () => {
    const params = useParams();
    const [clienteFound, setClienteFound] = useState();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        let clienteId = params.id;
        Blocking();
        ClienteService.GetCliente(clienteId).then((result) => {
            if (result.success) {
                setClienteFound(result.data)
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
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