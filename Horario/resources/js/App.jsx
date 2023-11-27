import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { ControlPanel } from './pages/ControlPanel';
import '../css/App.css'
import { Crud_Ambientes } from './pages/Crud_Ambientes';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/Panel' element={<ControlPanel/>}/>
                    <Route path='/Ambientes' element={<Crud_Ambientes/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;