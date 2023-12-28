import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { ControlPanel } from './pages/ControlPanel';
import { ConsultAprenttice } from './pages/ConsultAprenttice';
import { CrudInstructor } from './pages/CrudInstructor';
import { CrudCoordinators } from './pages/CrudCoordinators';
import { CrudEnvironments } from './pages/CrudEnvironments';
import { CrudRecords } from './pages/CrudRecords';
import { AddRecords } from './pages/AddRecords';
import { AddEnvironments } from './pages/AddEnvironments';
import { CrudQuarters } from './pages/CrudQuarters';
import { AddQuarter } from './pages/AddQuarter';
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
                    <Route path='/CrudTrimestres' element={<CrudQuarters/>}/>
                    <Route path='/AddFicha' element={<AddRecords/>}/>
                    <Route path='/AddAmbiente' element={<AddEnvironments/>}/>
                    <Route path='/AddTrimestre' element={<AddQuarter/>}/>
                    <Route path='/HorariosFichas' element={<WachtSchedules/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;