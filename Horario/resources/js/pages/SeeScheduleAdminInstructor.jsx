import React from 'react';
import { NavBar } from '../components/NavBar/NavBar';
import { InformationBarInstructor } from '../components/InformationBar/InformationBarInstructor';
import { FilterScheduleInstructorContextProvider } from '../context/FilterScheduleInstructorContext';
import { ScheduleAdminInstructor } from '../components/Schedule/ScheduleAdminInstructor';
import { InformationBarAdminInstructor } from '../components/InformationBar/InformationBarAdminInstructor';

export const SeeScheduleAdminInstructor = () => {
    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <FilterScheduleInstructorContextProvider >
                    <InformationBarAdminInstructor />
                    <ScheduleAdminInstructor />
                </FilterScheduleInstructorContextProvider>
            </main>
        </>
    )
}
