import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './views/homepage/homepage.jsx';
import AppNavBar from './components/navbar.jsx';
import ClienteHome from './views/cliente/index.jsx';
import ProdutoHome from './views/produto/index.jsx';
import CategoriaHome from './views/categoria/index.jsx';
import ClienteRegister from './views/cliente/register.jsx';
import ProdutoRegister from './views/produto/register.jsx';
import CategoriaRegister from './views/categoria/register.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <AppNavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Cliente */}
                <Route path="/cliente" element={<ClienteHome />} />
                <Route path="/cliente/register" element={<ClienteRegister />} />
                <Route path="/cliente/update" element={<></>} />
                {/* Produto */}
                <Route path="/produto" element={<ProdutoHome />} />
                <Route path="/produto/register" element={<ProdutoRegister />} />
                <Route path="/produto/update" element={<></>} />
                {/* Categoria */}
                <Route path="/categoria" element={<CategoriaHome />} />
                <Route path="/categoria/register" element={<CategoriaRegister />} />
                <Route path="/categoria/update" element={<></>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
