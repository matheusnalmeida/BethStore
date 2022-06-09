import React, { createContext, useReducer } from 'react';
import { CarrinhoReducer, sumItems } from './CarrinhoReducer';

export const CarrinhoContext = createContext()

const getActiveProducts = (cartItems) => {
    return cartItems.filter(product => product.ativo)
}

const storage = localStorage.getItem('cart') ? getActiveProducts(JSON.parse(localStorage.getItem('cart'))) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CarrinhoContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CarrinhoReducer, initialState)

    const increase = payload => {
        payload.quantidade++;
        dispatch({type: 'INCREASE', payload})
    }

    const decrease = payload => {
        payload.quantidade--;
        dispatch({type: 'DECREASE', payload})
    }

    const addProduct = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const updateProduct = payload => {
        dispatch({type: 'UPDATE_ITEM', payload})
    }

    const removeProduct = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'})
    }

    const handleCheckout = () => {
        dispatch({type: 'CHECKOUT'})
    }

    const isInCart = product => {
        return !!state.cartItems.find(item => item.codigo === product.codigo);
    }

    const contextValues = {
        removeProduct,
        addProduct,
        updateProduct,
        increase,
        decrease,
        clearCart,
        handleCheckout,
        isInCart,
        ...state
    } 

    return ( 
        <CarrinhoContext.Provider value={contextValues} >
            { children }
        </CarrinhoContext.Provider>
     );
}
 
export default CarrinhoContextProvider;
