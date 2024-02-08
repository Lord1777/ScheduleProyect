import React, { useEffect } from 'react';
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
import { ScheduleAprenttice } from './pages/Aprenttice/ScheduleAprenttice.jsx';
import { SeeScheduleFichas } from './pages/SeeScheduleFichas.jsx';
import { SeeScheduleInstructors } from './pages/SeeScheduleInstructors.jsx';
import { SeeScheduleAmbiente } from './pages/SeeScheduleAmbiente.jsx';
import { AddSchedule } from './pages/Add/AddSchedule.jsx';
import { ModalAsignar } from './components/Modals/ModalAsignar.jsx';
import { DetailsInstructor } from '../js/pages/Details/DetailsInstructor.jsx'
import { UpdateEnvironments } from './pages/Update/UpdateEnvironments.jsx';
import ProtectedRoute from './components/utils/ProtectedRoute.jsx';
import { AddProgram } from './pages/Add/AddProgram.jsx';
import { DetailsAmbiente } from '../js/pages/Details/DetailsAmbiente.jsx'
import { DetailsFicha } from '../js/pages/Details/DetailsFicha.jsx'
import { DetailsCoordinador } from '../js/pages/Details/DetailsCoordinador.jsx'
import { DetailsTrimestre } from '../js/pages/Details/DetailsTrimestre.jsx'
import { UpdateRecors } from './pages/Update/UpdateRecors';
import { UpdateInstructor } from './pages/Update/UpdateInstructor.jsx';
import { UpdateCoordinator } from './pages/Update/UpdateCoordinator.jsx';
import { UpdateQuaters } from '../js/pages/Update/UpdateQuaters';
import { useUser } from './context/UserContext.jsx';
import { Loading } from './components/Loading/Loading.jsx';
import { CrudPrograms } from './pages/CRUD/CrudPrograms.jsx';
import { UpdateProgram } from './pages/Update/UpdateProgram.jsx';
import useSessionControl from "./hooks/useSessionControl.js";
import "../css/App.css";

function App() {

    useSessionControl();

    const { authenticateUser } = useUser();

    let storedToken = localStorage.getItem('access_token');
    let storedRole = localStorage.getItem('role');
    let storedUserData = localStorage.getItem('user_data');

    useEffect(() => {
        if(storedToken && storedRole && storedUserData){
            authenticateUser(storedToken, storedRole, JSON.parse(storedUserData));
        }
    }, [])

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/ConsultaAprendiz' element={<ConsultAprenttice />} />
                    <Route path='/403-forbidden' element={<Forbidden />} />
                    <Route path='/HorarioAprendiz/:idFicha' element={<ScheduleAprenttice />} />
                    {/* <Route path='/HorarioFichas' element={<SeeScheduleFichas />} /> */}
                    <Route path='/HorarioInstructor/:idUsuario' element={<SeeScheduleInstructors />} />
                    <Route path='/HorarioAmbiente' element={<SeeScheduleAmbiente />} />
                    <Route path='/AddHorario/:id' element={<AddSchedule />} />
                    <Route path='/CrudProgramas' element={<CrudPrograms/>}/>
                    <Route path='/UpdatePrograma/:id' element={<UpdateProgram/>}/>
                    <Route path='/AddCoordinador' element={<AddCoordinator />} />

                    {/* Vistas del coordinador */}
                    <Route element={<ProtectedRoute role={'coordinador'} userRole={storedRole} />}  >
                        <Route path='/Panel' element={<ControlPanel />} />
                        <Route path='/HorariosFichas' element={<WatchSchedules />} />
                        <Route path='/CrudInstructor' element={<CrudInstructor />} />
                        <Route path='/CrudFichas' element={<CrudRecords />} />
                        <Route path='/CrudTrimestres' element={<CrudQuarters />} />
                        <Route path='/CrudCoordinadores' element={<CrudCoordinators />} />
                        <Route path='/CrudAmbientes' element={<CrudEnvironments />} />
                        <Route path='/AddInstructor' element={<AddInstructors />} />
                        <Route path='/CrudCoordinadores' element={<CrudCoordinators />} />
                        <Route path='/AddAmbiente' element={<AddEnvironments />} />
                        <Route path='/AddPrograma' element={<AddProgram />} />
                        <Route path='/AddFicha' element={<AddRecords />} />
                        <Route path='/AddTrimestre' element={<AddQuarter />} />
                        <Route path='/DetallesAmbiente' element={<DetailsAmbiente />} />
                        <Route path='/DetallesTrimestre' element={<DetailsTrimestre />} />
                        <Route path='/DetallesInstructor' element={<DetailsInstructor />} />
                        <Route path='/DetallesFicha' element={<DetailsFicha />} />
                        <Route path='/DetallesCoordinador' element={<DetailsCoordinador />} />
                        <Route path='/UpdateFicha/:id' element={<UpdateRecors />} />
                        <Route path='/UpdateInstructor/:id' element={<UpdateInstructor />} />
                        <Route path='/UpdateCoordinador/:id' element={<UpdateCoordinator />} />
                        <Route path='/UpdateAmbiente/:id' element={<UpdateEnvironments />} />
                        <Route path='/UpdateTrimestre/:id' element={<UpdateQuaters/>} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;