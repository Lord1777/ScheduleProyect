import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { SeeSchedule } from '../components/Schedule/SeeSchedule'
import { InformationBarInstructor } from '../components/InformationBar/InformationBarInstructor'

export const SeeScheduleInstructors = () => {
    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_hoario">
                <InformationBarInstructor/>
                <SeeSchedule />
            </main>
        </>
    )
}
