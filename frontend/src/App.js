import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/homepage/homepage.jsx';
import Index from './components/categoria/index.jsx';

const  App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/categoria/index" element={<Index/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
