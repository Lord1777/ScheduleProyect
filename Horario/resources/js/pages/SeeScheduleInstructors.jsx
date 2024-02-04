import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { SeeSchedule } from '../components/Schedule/SeeSchedule'
import { InformationBarInstructor } from '../components/InformationBar/InformationBarInstructor'
import { useParams } from 'react-router-dom'

export const SeeScheduleInstructors = () => {

    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_hoario">
                <InformationBarInstructor />
                <SeeSchedule route={''} />
            </main>
        </>
    )
}
