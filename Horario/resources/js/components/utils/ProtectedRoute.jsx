import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ControlPanel } from '../../pages/ControlPanel';
import { CrudInstructor } from '../../pages/CrudInstructor';
import { CrudEnvironments } from '../../pages/CrudEnvironments';
import { CrudRecords } from '../../pages/CrudRecords';
import { CrudQuarters } from '../../pages/CrudQuarters';
import { CrudCoordinators } from '../../pages/CrudCoordinators';
import { AddRecords } from '../../pages/AddRecords';
import { AddEnvironments } from '../../pages/AddEnvironments';
import { AddInstructors } from '../../pages/AddInstructors';
import { AddCoordinator } from '../../pages/AddCoordinator';
import { WatchSchedules } from '../../pages/WatchSchedules';


const roleConfig = {
    coordinador: {
        allowedRoles: ['coordinador'],
        components: [
            <ControlPanel />,
            <CrudInstructor />,
            <CrudEnvironments />,
            <CrudRecords />,
            <CrudQuarters />,
            <CrudCoordinators />,
            <AddRecords />,
            <AddEnvironments />,
            <WatchSchedules />,
            <AddInstructors />,
            <AddCoordinator />,
        ],
        redirectPath: '/',
    },
    instructor: {
        allowedRoles: ['instructor'],
        components: [],
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

    // Renderizar el Outlet o el componente específico según la configuración
    return <Outlet>{config.components}</Outlet>;
}

export default ProtectedRoute


