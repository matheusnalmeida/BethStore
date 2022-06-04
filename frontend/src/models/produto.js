const Produto = (
    codigo = "",
    marca = "",
    modelo = "",
    preco = "",
    quantidade = "",
    tamanho = "",
    descricao = "",
    categoria_codigo = "",
    categoria = {},
    ativo = null
) => {
    return {  
        codigo: codigo,
        marca: marca,
        modelo: modelo,
        preco: preco,
        quantidade: quantidade,
        tamanho: tamanho,
        descricao: descricao,
        categoria_codigo: categoria_codigo,
        categoria: categoria,
        ativo: ativo
    }
}

export default Produto;