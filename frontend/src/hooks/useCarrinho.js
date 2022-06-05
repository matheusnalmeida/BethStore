
import { useContext } from 'react';
import { CarrinhoContext } from '../store/carrinho/CarrinhoContext';

export const useCarrinho = () => {
   
    const ctx = useContext(CarrinhoContext)

    return {
        ...ctx
    }
}