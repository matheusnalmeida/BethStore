
import { useContext } from 'react';
import { BethStoreContext } from '../store/bethstore/BethStoreContext';

export const useBlocking = () => {
   
    const ctx = useContext(BethStoreContext)

    return {
        ...ctx
    }
}