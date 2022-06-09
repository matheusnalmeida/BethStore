
const Aprovacao = (
    id = "",
    codigo_aprovacao = "",
    status = ""
) => {
    return {  
        id: id,
        codigo_aprovacao: codigo_aprovacao,
        status: status
    }
}

export default Aprovacao;