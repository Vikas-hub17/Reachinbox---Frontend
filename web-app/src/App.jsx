// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Onebox from './pages/Onebox';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/onebox" element={<Onebox />} />
            </Routes>
        </Router>
    );
};

export default App;
