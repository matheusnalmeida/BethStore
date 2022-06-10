import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Home from './views/homepage/homepage.jsx';
import AppNavBar from './components/navbar.jsx';
import ClienteHome from './views/cliente/index.jsx';
import ProdutoHome from './views/produto/index.jsx';
import CategoriaHome from './views/categoria/index.jsx';
import ClienteRegister from './views/cliente/register.jsx';
import ProdutoRegister from './views/produto/register.jsx';
import CategoriaRegister from './views/categoria/register.jsx';
import Carrinho from './views/carrinho/carrinho.jsx';
import CategoriaUpdate from './views/categoria/update.jsx';
import ClienteUpdate from './views/cliente/update.jsx';
import ProdutoUpdate from './views/produto/update.jsx';
import CarrinhoContextProvider from './store/carrinho/CarrinhoContext.js';
import PagamentoForm from './views/pedido/PedidoForm.jsx';
import PedidoHome from './views/pedido/index.jsx';
import PedidoDetails from './views/pedido/details.jsx';
import BethStoreContext from "./store/bethstore/BethStoreContext";

const App = () => {
    return (
        <BethStoreContext>
            <CarrinhoContextProvider>
                <BrowserRouter>
                    <AppNavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Cliente */}
                        <Route path="/cliente" element={<ClienteHome />} />
                        <Route path="/cliente/register" element={<ClienteRegister />} />
                        <Route path="/cliente/update/:id" element={<ClienteUpdate />} />
                        {/* Produto */}
                        <Route path="/produto" element={<ProdutoHome />} />
                        <Route path="/produto/register" element={<ProdutoRegister />} />
                        <Route path="/produto/update/:id" element={<ProdutoUpdate />} />
                        {/* Categoria */}
                        <Route path="/categoria" element={<CategoriaHome />} />
                        <Route path="/categoria/register" element={<CategoriaRegister />} />
                        <Route path="/categoria/update/:id" element={<CategoriaUpdate />} />
                        {/* Carrinho */}
                        <Route path="/carrinho" element={<Carrinho />} />
                        {/* Pedido */}
                        <Route path="/pedido" element={<PedidoHome />} />
                        <Route path="/pedido/pagamento" element={<PagamentoForm />} />
                        <Route path="/pedido/details/:id" element={<PedidoDetails />} />
                    </Routes>
                </BrowserRouter>
            </CarrinhoContextProvider>
            <ToastContainer
                theme="colored"
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </BethStoreContext>
    );
}

export default App;
