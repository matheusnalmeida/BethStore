import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/homepage/homepage.jsx';
import IndexC from './components/categoria/indexC.jsx';

const  App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/categoria" element={<IndexC/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
