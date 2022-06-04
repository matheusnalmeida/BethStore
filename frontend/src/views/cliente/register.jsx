import React from "react";
import Cliente from "../../models/cliente";
import ClienteForm from "./common/cliente-form";

const ClienteRegister = () => {
    return (
        <ClienteForm
            isEdit={false}
            clienteProp={Cliente()}
        />  
    );
}

export default ClienteRegister;