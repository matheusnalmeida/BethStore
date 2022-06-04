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


const App = () => {
    return (
        <>
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
                    <Route path="/produto/update/:id" element={<></>} />
                    {/* Categoria */}
                    <Route path="/categoria" element={<CategoriaHome />} />
                    <Route path="/categoria/register" element={<CategoriaRegister />} />
                    <Route path="/categoria/update/:id" element={<CategoriaUpdate />} />
                    {/* Carrinho */}
                    <Route path="/carrinho" element={<Carrinho />} />
                </Routes>
            </BrowserRouter>
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
        </>
    );
}

export default App;
