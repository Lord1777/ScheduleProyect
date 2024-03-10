import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { ControlPanel } from '../../pages/ControlPanel';
import { CrudInstructor } from '../../pages/CRUD/CrudInstructor';
import { CrudEnvironments } from '../../pages/CRUD/CrudEnvironments';
import { CrudRecords } from '../../pages/CRUD/CrudRecords';
import { CrudQuarters } from '../../pages/CRUD/CrudQuarters';
import { CrudCoordinators } from '../../pages/CRUD/CrudCoordinators';
import { AddRecords } from '../../pages/Add/AddRecords';
import { AddEnvironments } from '../../pages/Add/AddEnvironments';
import { AddInstructors } from '../../pages/Add/AddInstructors';
import { AddCoordinator } from '../../pages/Add/AddCoordinator';
import { WatchSchedules } from '../../pages/WatchSchedules';
import { HorariosPanel } from '../../pages/HorariosPanel';
import { CardHorarios } from '../Cards/CardHorarios';
import { WatchSchedulesInstructor } from '../../pages/WatchSchedulesInstructor';
import { SeeScheduleInstructors } from '../../pages/SeeScheduleInstructors';
import { SeeScheduleAmbiente } from '../../pages/SeeScheduleAmbiente';
import { WatchScheduleAmbiente } from '../../pages/WatchScheduleAmbiente';
import { CrudPrograms } from '../../pages/CRUD/CrudPrograms';
import { FormAddAmbiente } from '../Form/FormAddAmbiente';
import { AddProgram } from '../../pages/Add/AddProgram';
import { AddQuarter } from '../../pages/Add/AddQuarter';
import { AddSchedule } from '../../pages/Add/AddSchedule';
import { DetailsAmbiente } from '../../pages/Details/DetailsAmbiente';
import { DetailsTrimestre } from '../../pages/Details/DetailsTrimestre';
import { DetailsInstructor } from '../../pages/Details/DetailsInstructor';
import { DetailsFicha } from '../../pages/Details/DetailsFicha';
import DetailsCoordinador from '../../pages/Details/DetailsCoordinador';
import { UpdateRecors } from '../../pages/Update/UpdateRecors';
import { UpdateInstructor } from '../../pages/Update/UpdateInstructor';
import { UpdateCoordinator } from '../../pages/Update/UpdateCoordinator';
import { FormUpdateAmbiente } from '../Form/FormUpdateAmbiente';
import FormUpdateTrimestre from '../Form/FormUpdateTrimestre';
import { UpdateProgram } from '../../pages/Update/UpdateProgram';
import { ScheduleUpdateFicha } from '../Schedule/ScheduleUpdateFicha';
import { ManageScheduleUpdateFicha } from '../../pages/ManageScheduleUpdateFicha';
import { SeeScheduleAdminInstructor } from '../../pages/SeeScheduleAdminInstructor';
import { MyProfile } from '../../pages/MyProfile';
import { ScheduleAdminAprenttice } from '../../pages/ScheduleAdminAprenttice';
import { ComparationsSchedule } from '../../pages/CompationSchedules/ComparationsSchedule';


const roleConfig = {
    instructor: {
        allowedRoles: ['instructor'],
        components: {
            'HorarioInstructor': SeeScheduleInstructors,
            'PerfilInstructor': MyProfile,
        },
        redirectPath: '/',
    },
    coordinador: {
        allowedRoles: ['coordinador'],
        components: {
            'controlPanel': ControlPanel,
            'ComparacionHorarios': ComparationsSchedule,
            'PanelHorarios': HorariosPanel,
            'Card': CardHorarios,
            'HorariosFichas': WatchSchedules,
            'HorarioAdminAprendiz': ScheduleAdminAprenttice,
            'HorarioAdminInstructor': SeeScheduleAdminInstructor,
            'HorariosInstructores': WatchSchedulesInstructor,
            'HorarioInstructor': SeeScheduleInstructors,
            'HorarioAmbiente': SeeScheduleAmbiente,
            'HorariosAmbientes': WatchScheduleAmbiente,
            'CrudInstructor': CrudInstructor,
            'CrudFichas': CrudRecords,
            'CrudTrimestres': CrudQuarters,
            'CrudCoordinadores': CrudCoordinators,
            'CrudAmbientes': CrudEnvironments,
            'CrudProgramas': CrudPrograms,
            'AddInstructor': AddInstructors,
            'AddAmbiente': AddEnvironments,
            'AddPrograma': AddProgram,
            'AddFicha': AddRecords,
            'AddTrimestre': AddQuarter,
            'AddCoordinador': AddCoordinator,
            'AddHorario': AddSchedule,
            'DetallesAmbiente': DetailsAmbiente,
            'DetallesTrimestre': DetailsTrimestre,
            'DetallesInstructor': DetailsInstructor,
            'DetallesFicha': DetailsFicha,
            'DetallesCoordinador': DetailsCoordinador,
            'UpdateFicha': UpdateRecors,
            'UpdateInstructor': UpdateInstructor,
            'UpdateCoordinador': UpdateCoordinator,
            'UpdateAmbiente': FormUpdateAmbiente,
            'UpdateTrimestre': FormUpdateTrimestre,
            'UpdatePrograma': UpdateProgram,
            'ScheduleUpdateFicha': ManageScheduleUpdateFicha,
            'PerfilCoordinador': MyProfile,
        },
        redirectPath: '/',
    },
}

const ProtectedRoute = ({ role, userRole }) => {

    const config = roleConfig[role];

    if (!config) {
        // Si no hay configuración para el rol, redirigir a una página de error o a la página de inicio
        return <Navigate to="/" replace />;
    }

    // Verificar si el rol del usuario está en la lista de roles permitidos
    const canActivate = config.allowedRoles.includes(userRole);

    if (!canActivate) {
        return <Navigate to={config.redirectPath} replace />;
    }

    // Renderizar el Outlet o el componente específico
    return (<Outlet>{Object.entries(config.components).map(([key, Component]) => (
        <Route key={key} path={`/${key}`} element={<Component />} />
    ))}
    </Outlet>);
}

export default ProtectedRoute


