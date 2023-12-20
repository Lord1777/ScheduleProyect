import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { ControlPanel } from './pages/ControlPanel';
import { ConsultAprenttice } from './pages/ConsultAprenttice';
import { CrudInstructor } from './pages/CrudInstructor';
import { CrudCoordinators } from './pages/Crudcoordinators';
import { CrudEnvironments } from './pages/CrudEnvironments';
import { CrudRecords } from './pages/CrudRecords';
import '../css/App.css'
import { Crud_Ambientes } from './pages/Crud_Ambientes';
import { WachtSchedules } from './pages/WachtSchedules';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/Panel' element={<ControlPanel/>}/>
                    <Route path='/ConsultaAprendiz' element={<ConsultAprenttice/>}/>
                    <Route path='/CrudInstructor' element={<CrudInstructor/>}/>
                    <Route path='/CrudCoordinadores' element={<CrudCoordinators/>}/>
                    <Route path='/CrudAmbientes' element={<CrudEnvironments/>}/>
                    <Route path='/CrudFichas' element={<CrudRecords/>}/>
                    <Route path='/Ambientes' element={<Crud_Ambientes/>}/>
                    <Route path='/HorariosFichas' element={<WachtSchedules/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;