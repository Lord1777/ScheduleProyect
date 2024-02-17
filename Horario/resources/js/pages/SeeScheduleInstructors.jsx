import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { ScheduleInstructor } from '../components/Schedule/ScheduleInstructor'
import { FilterScheduleInstructorContextProvider } from '../context/FilterScheduleInstructorContext'
import { InformationBarAdminInstructor } from '../components/InformationBar/InformationBarAdminInstructor'

export const SeeScheduleInstructors = () => {

    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
            <FilterScheduleInstructorContextProvider >
                <InformationBarAdminInstructor />
                <ScheduleInstructor/>
            </FilterScheduleInstructorContextProvider>
            </main>
        </>
    )
}
