const Produto = (
    codigo = "",
    marca = "",
    modelo = "",
    preco = "",
    estoque = "",
    tamanho = "",
    descricao = "",
    categoria_codigo = "",
    categoria = {},
    quantidade = "",
    ativo = null
) => {
    return {  
        codigo: codigo,
        marca: marca,
        modelo: modelo,
        preco: preco,
        estoque: estoque,
        tamanho: tamanho,
        descricao: descricao,
        categoria_codigo: categoria_codigo,
        categoria: categoria,
        quantidade: quantidade,
        ativo: ativo
    }
}

export default Produto;