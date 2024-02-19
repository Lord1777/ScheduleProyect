import React, { useState, useEffect } from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { ScheduleInstructor } from '../components/Schedule/ScheduleInstructor'
import { FilterScheduleInstructorContextProvider } from '../context/FilterScheduleInstructorContext'
import { InformationBarAdminInstructor } from '../components/InformationBar/InformationBarAdminInstructor'
import { useUser } from '../context/UserContext';
import { ChangePasswordFirts } from '../components/Modals/ChangePasswordFirts';
import useFecthPutPassword from '../hooks/FetchPUT/useFecthPutPassword';
import { Loading } from '../components/Loading/Loading';

export const SeeScheduleInstructors = () => {

    const { user } = useUser();
    const {
        openPasswordModal,
        closePasswordModal,
        modalChangePasword
    } = useFecthPutPassword();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.userData) {
            setLoading(false);
            if (user.userData.sesion === 0) {
                openPasswordModal();
            }
        }
    }, [user]);

    if (loading) {
        return <Loading />
    }

    const userData = user.userData;

    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <FilterScheduleInstructorContextProvider >
                    <InformationBarAdminInstructor />
                    <ScheduleInstructor />
                </FilterScheduleInstructorContextProvider>
            </main>
            <ChangePasswordFirts
                IdUser={userData.idUsuario}
                open={modalChangePasword}
                close={closePasswordModal}
            />
        </>
    )
}
