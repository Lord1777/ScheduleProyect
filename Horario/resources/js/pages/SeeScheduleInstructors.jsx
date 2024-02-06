import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'

import { InformationBarInstructor } from '../components/InformationBar/InformationBarInstructor'
import { useParams } from 'react-router-dom'
import { ScheduleInstructor } from '../components/Schedule/ScheduleInstructor'

export const SeeScheduleInstructors = () => {

    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <InformationBarInstructor />
                <ScheduleInstructor/>
            </main>
        </>
    )
}
