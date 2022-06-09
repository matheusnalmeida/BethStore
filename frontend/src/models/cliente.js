const Cliente = (
    id = "",
    nome = "",
    telefone = "",
    email = "",
    cpf = "",
    cep = "",
    endereco = "",
    ativo = null
) => {
    return {
        id: id,
        nome: nome,
        telefone: telefone,
        email: email,
        cpf: cpf,
        cep: cep,
        ativo: ativo
    }
}

export default Cliente;