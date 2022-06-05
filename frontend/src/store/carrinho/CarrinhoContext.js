import React, { createContext, useReducer } from 'react';
import { CarrinhoReducer, sumItems } from './CarrinhoReducer';

export const CarrinhoContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CarrinhoContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CarrinhoReducer, initialState)

    const increase = payload => {
        dispatch({type: 'INCREASE', payload})
    }

    const decrease = payload => {
        dispatch({type: 'DECREASE', payload})
    }

    const addProduct = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const removeProduct = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'})
    }

    const handleCheckout = () => {
        console.log('CHECKOUT', state);
        dispatch({type: 'CHECKOUT'})
    }

    const isInCart = product => {
        return !!state.cartItems.find(item => item.codigo === product.codigo);
    }

    const contextValues = {
        removeProduct,
        addProduct,
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
