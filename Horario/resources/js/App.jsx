import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { ControlPanel } from './pages/ControlPanel';
import { ConsultAprenttice } from './pages/ConsultAprenttice';
import { CrudInstructor } from './pages/CRUD/CrudInstructor.jsx';
import { CrudCoordinators } from './pages/CRUD/CrudCoordinators.jsx';
import { CrudEnvironments } from './pages/CRUD/CrudEnvironments.jsx';
import { CrudRecords } from './pages/CRUD/CrudRecords.jsx';
import { AddRecords } from './pages/Add/AddRecords';
import { AddEnvironments } from './pages/Add/AddEnvironments';
import { CrudQuarters } from './pages/CRUD/CrudQuarters.jsx';
import { AddQuarter } from './pages/Add/AddQuarter';
import { WatchSchedules } from '../../resources/js/pages/WatchSchedules.jsx';
import { AddInstructors } from './pages/Add/AddInstructors';
import { AddCoordinator } from './pages/Add/AddCoordinator';
import { Forbidden } from './content/Forbidden.jsx';
import ProtectedRoute from './components/utils/ProtectedRoute.jsx';
import "../css/App.css";



function App() {

    let access_token = localStorage.getItem('access_token');
    let role = localStorage.getItem('role');
    console.log(role)

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/ConsultaAprendiz' element={<ConsultAprenttice />} />
                    <Route path='/403-forbidden' element={<Forbidden/>} />

                {/* Vistas del coordinador */}
                    <Route element={ <ProtectedRoute role={'coordinador'} userRole={role} />}  >
                        <Route path='/Panel' element={<ControlPanel />} /> 
                        <Route path='/HorariosFichas' element={<WatchSchedules />} />

                        <Route path='/CrudInstructor' element={<CrudInstructor />} />
                        <Route path='/CrudCoordinadores' element={<CrudCoordinators />} />
                        <Route path='/CrudAmbientes' element={<CrudEnvironments />} />
                        <Route path='/CrudFichas' element={<CrudRecords />} />
                        <Route path='/CrudTrimestres' element={<CrudQuarters />} />

                        <Route path='/AddInstructor' element={<AddInstructors />} />
                        <Route path='/AddCoordinador' element={<AddCoordinator />} />
                        <Route path='/AddAmbiente' element={<AddEnvironments />} />
                        <Route path='/AddFicha' element={<AddRecords />} />
                        <Route path='/AddTrimestre' element={<AddQuarter />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;