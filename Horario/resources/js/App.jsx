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
import '../css/App.css'
import { WatchSchedules } from '../../resources/js/pages/WatchSchedules.jsx';
import { AddInstructors } from './pages/AddInstructors';
import { AddCoordinator } from './pages/AddCoordinator';
import "../css/App.css";
import { Experiment } from './pages/Experiment';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Panel' element={<ControlPanel />} />
                    <Route path='/ConsultaAprendiz' element={<ConsultAprenttice />} />
                    <Route path='/CrudInstructor' element={<CrudInstructor />} />
                    <Route path='/CrudCoordinadores' element={<CrudCoordinators />} />
                    <Route path='/CrudAmbientes' element={<CrudEnvironments />} />
                    <Route path='/CrudFichas' element={<CrudRecords />} />
                    <Route path='/AddFicha' element={<AddRecords />} />
                    <Route path='/AddAmbiente' element={<AddEnvironments />} />
                    <Route path='/CrudTrimestres' element={<CrudQuarters />} />
                    <Route path='/AddTrimestre' element={<AddQuarter />} />
                    <Route path='/HorariosFichas' element={<WatchSchedules />} />
                    <Route path='/Experiment' element={<Experiment/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;