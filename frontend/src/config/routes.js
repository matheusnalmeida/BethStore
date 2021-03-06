// CATEGORIAS
export const GET_CATEGORIAS = '/categoria/'

export const GET_CATEGORIA = (id) => `/categoria/${id}`

export const DELETE_CATEGORIA = (id) => `/categoria/${id}/delete`

export const REGISTER_CATEGORIA = '/categoria/register'

export const UPDATE_CATEGORIA = (id) => `/categoria/${id}/update`

// CLIENTES

export const GET_CLIENTES = '/cliente/'

export const GET_CLIENTE = (id) => `/cliente/${id}`

export const DELETE_CLIENTE = (id) => `/cliente/${id}/delete`

export const REGISTER_CLIENTE = '/cliente/register'

export const UPDATE_CLIENTE = (id) => `/cliente/${id}/update`

// CLIENTES

export const GET_PRODUTOS = '/produto/'

export const GET_PRODUTO = (id) => `/produto/${id}`

export const DELETE_PRODUTO = (id) => `/produto/${id}/delete`

export const REGISTER_PRODUTO = '/produto/register'

export const UPDATE_PRODUTO = (id) => `/produto/${id}/update`

// API VIACEP

export const GET_CEP_INFO = (cep) => `/${cep}/json/`

// FRETE 

export const CALCULAR_FRETE = (cep) => `/frete/calcular-frete/${cep}`

// PEDIDO

export const GET_PEDIDOS = '/pedido/'

export const GET_PEDIDO = (id) => `/pedido/${id}`

export const REGISTER_PEDIDO = '/pedido/register'