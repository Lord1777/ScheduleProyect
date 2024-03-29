import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute.jsx';
import useSessionControl from "./hooks/useSessionControl.js";
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
import { WatchSchedules } from './pages/WatchSchedules.jsx';
import { AddInstructors } from './pages/Add/AddInstructors';
import { AddCoordinator } from './pages/Add/AddCoordinator';
import { Forbidden } from './content/Forbidden.jsx';
import { ScheduleAprenttice } from './pages/Aprenttice/ScheduleAprenttice.jsx';
import { SeeScheduleInstructors } from './pages/SeeScheduleInstructors.jsx';
import { SeeScheduleAmbiente } from './pages/SeeScheduleAmbiente.jsx';
import { AddSchedule } from './pages/Add/AddSchedule.jsx';
import { UpdateEnvironments } from './pages/Update/UpdateEnvironments.jsx';
import { AddProgram } from './pages/Add/AddProgram.jsx';
import { UpdateRecors } from './pages/Update/UpdateRecors';
import { UpdateInstructor } from './pages/Update/UpdateInstructor.jsx';
import { UpdateCoordinator } from './pages/Update/UpdateCoordinator.jsx';
import { UpdateQuaters } from './pages/Update/UpdateQuaters.jsx';
import { useUser } from './context/UserContext.jsx';
import { CrudPrograms } from './pages/CRUD/CrudPrograms.jsx';
import { UpdateProgram } from './pages/Update/UpdateProgram.jsx';
import { WatchSchedulesInstructor } from './pages/WatchSchedulesInstructor.jsx';
import { WatchScheduleAmbiente } from './pages/WatchScheduleAmbiente.jsx';
import { HorariosPanel } from './pages/HorariosPanel.jsx';
import { CardHorarios } from './components/Cards/CardHorarios.jsx';
import { Password } from './pages/Password.jsx';
import { ManageScheduleUpdateFicha } from './pages/ManageScheduleUpdateFicha.jsx';
import { MyProfile } from './pages/MyProfile.jsx';
import { SeeScheduleAdminInstructor } from './pages/SeeScheduleAdminInstructor.jsx';
import { ScheduleAdminAprenttice } from './pages/ScheduleAdminAprenttice.jsx';
import { ContinuoModal } from './components/Modals/ContinuoModal.jsx';
import error from './assets/img/Advertencia.png'
import { AboutDevelopers } from './pages/Developers/AboutDevelopers.jsx';
import "../css/App.css";
import { ComparationsSchedule } from './pages/CompationSchedules/ComparationsSchedule.jsx';
import { ComparationScheduleAmbiente } from './pages/CompationSchedules/ComparationScheduleAmbiente.jsx';
import { ComparationScheduleFicha } from './pages/CompationSchedules/ComparationScheduleFicha.jsx';


function App() {


    const { isModal, ShowCloseModal, alertMessage, ruta } = useSessionControl();

    const { authenticateUser } = useUser();

    let storedToken = localStorage.getItem('access_token');
    let storedRole = localStorage.getItem('role');
    let storedUserData = localStorage.getItem('user_data');

    useEffect(() => {

        // const getToken = async () => {
        //     try {
        //         await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        //             method: "GET",
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             credentials: 'include',
        //         })
        //         .then(response => response.json());
        //     } catch (error) {
        //         console.log('');
        //     }
        // }

        // getToken();

        if (storedToken && storedRole && storedUserData) {
            authenticateUser(storedToken, storedRole, JSON.parse(storedUserData));
        }
    }, [])

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/403-forbidden' element={<Forbidden />} />
                    <Route path='/RecuperarContraseña' element={<Password />} />
                    <Route path='/ConsultaAprendiz' element={<ConsultAprenttice />} />
                    <Route path='/HorarioAprendiz/:idFicha' element={<ScheduleAprenttice />} />
                    <Route path='/Acerca-de' element={<AboutDevelopers />} />

                    {/* Vistas del coordinador */}
                    <Route element={<ProtectedRoute role={'coordinador'} userRole={storedRole} />}  >
                        <Route path='/PerfilCoordinador' element={<MyProfile />} />
                        <Route path='/Panel' element={<ControlPanel />} />
                        <Route path='/PanelHorarios' element={<HorariosPanel />} />
                        <Route path='/Card' element={<CardHorarios />} />
                        <Route path='/HorarioAdminAprendiz/:idFicha/:idHorario/:manage?' element={<ScheduleAdminAprenttice />} />
                        <Route path='/HorariosFichas' element={<WatchSchedules />} />
                        <Route path='/HorarioAdminInstructor/:idUsuario/:idTrimestre' element={<SeeScheduleAdminInstructor />} />
                        <Route path='/HorariosInstructores' element={<WatchSchedulesInstructor />} />
                        <Route path='/HorarioAmbiente/:idAmbiente/:idTrimestre' element={<SeeScheduleAmbiente />} />
                        <Route path='/ComparacionHorariosInstructores' element={<ComparationsSchedule/>}/>
                        <Route path='/ComparacionHorariosAmbientes' element={<ComparationScheduleAmbiente/>}/>
                        <Route path='/ComparacionHorariosFichas' element={<ComparationScheduleFicha/>}/>
                        <Route path='/HorariosAmbientes' element={<WatchScheduleAmbiente />} />
                        <Route path='/CrudInstructor' element={<CrudInstructor />} />
                        <Route path='/CrudFichas' element={<CrudRecords />} />
                        <Route path='/CrudTrimestres' element={<CrudQuarters />} />
                        <Route path='/CrudCoordinadores' element={<CrudCoordinators />} />
                        <Route path='/CrudAmbientes' element={<CrudEnvironments />} />
                        <Route path='/CrudProgramas' element={<CrudPrograms />} />
                        <Route path='/AddCoordinador' element={<AddCoordinator />} />
                        <Route path='/AddInstructor' element={<AddInstructors />} />
                        <Route path='/AddAmbiente' element={<AddEnvironments />} />
                        <Route path='/AddPrograma' element={<AddProgram />} />
                        <Route path='/AddFicha' element={<AddRecords />} />
                        <Route path='/AddTrimestre' element={<AddQuarter />} />
                        <Route path='/AddHorario/:id' element={<AddSchedule />} />
                        <Route path='/UpdateFicha/:id' element={<UpdateRecors />} />
                        <Route path='/UpdateInstructor/:id' element={<UpdateInstructor />} />
                        <Route path='/UpdateCoordinador/:id' element={<UpdateCoordinator />} />
                        <Route path='/UpdateAmbiente/:id' element={<UpdateEnvironments />} />
                        <Route path='/UpdateTrimestre/:id' element={<UpdateQuaters />} />
                        <Route path='/UpdatePrograma/:id' element={<UpdateProgram />} />
                        <Route path='/ScheduleUpdateFicha/:idFicha/:idHorario/:idTrimestre' element={<ManageScheduleUpdateFicha />} />
                    </Route>

                    {/* Vistas del instructor */}
                    <Route element={<ProtectedRoute role={'instructor'} userRole={storedRole} />} >
                        <Route path='/HorarioInstructor/:idUsuario' element={<SeeScheduleInstructors />} />
                        <Route path='/PerfilInstructor' element={<MyProfile />} />
                    </Route>
                </Routes>
                <ContinuoModal
                    tittle="Alerta"
                    imagen={error}
                    message={alertMessage}
                    open={isModal}
                    close={ShowCloseModal}
                    route={ruta}
                />
            </Router>

        </>
    );
}

export default App;
