import React from 'react';
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


