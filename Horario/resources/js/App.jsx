import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { ControlPanel } from './pages/ControlPanel';
import { ConsultAprenttice } from './pages/ConsultAprenttice';
import { CrudInstructor } from '../js/pages/CRUD/CrudInstructor';
import { CrudCoordinators } from '../js/pages/CRUD/CrudCoordinators';
import { CrudEnvironments } from '../js/pages/CRUD/CrudEnvironments';
import { CrudRecords } from '../js/pages/CRUD/CrudRecords';
import { AddRecords } from '../js/pages/Add/AddRecords';
import { AddEnvironments } from '../js/pages/Add/AddEnvironments';
import { CrudQuarters } from '../js/pages/CRUD/CrudQuarters';
import { AddQuarter } from '../js/pages/Add/AddQuarter';
import '../css/App.css'
import { WatchSchedules } from '../../resources/js/pages/WatchSchedules';
import { AddInstructors } from '../js/pages/Add/AddInstructors';
import { AddCoordinator } from '../js/pages/Add/AddCoordinator';
import "../css/App.css";
import { Experiment } from '../js/pages/Experiment';
import { DetailsFicha } from '../js/pages/Details/DetailsFicha';
import { DetailsAmbiente } from '../js/pages/Details/DetailsAmbiente';


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
                    <Route path='/DetallesFicha' element={<DetailsFicha/>} />
                    <Route path='/DetallesAmbiente' element={<DetailsAmbiente/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;