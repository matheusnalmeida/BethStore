
const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const sumItems = cartItems => {
    Storage(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantidade, 0);
    let total = cartItems.reduce((total, product) => total + product.preco * product.quantidade, 0).toFixed(2);
    return { itemCount, total }
}

export const CarrinhoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find(item => item.codigo === action.payload.codigo)) {
                state.cartItems.push({
                    ...action.payload,
                    quantidade: 1
                })
            } 

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "UPDATE_ITEM":
            let produtoUpdateIndex = state.cartItems.findIndex(item => item.codigo === action.payload.codigo)
            if (produtoUpdateIndex !== -1) {
                let originalProductUpdate = state.cartItems[produtoUpdateIndex]
                state.cartItems[produtoUpdateIndex] = {...originalProductUpdate,...action.payload}
            } 
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }            
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.codigo !== action.payload.codigo)),
                cartItems: [...state.cartItems.filter(item => item.codigo !== action.payload.codigo)]
            }
        case "INCREASE":
            let produtoAdd = state.cartItems[state.cartItems.findIndex(item => item.codigo === action.payload.codigo)];
            produtoAdd.quantidade = action.payload.quantidade;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            let produtoDecrease = state.cartItems[state.cartItems.findIndex(item => item.codigo === action.payload.codigo)];
            produtoDecrease.quantidade = action.payload.quantidade;
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            }
        case "CLEAR":
                return {
                    cartItems: [],
                    ...sumItems([]),
                }
        default:
            return state

    }
}