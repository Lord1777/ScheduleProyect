import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { SeeSchedule } from '../components/Schedule/SeeSchedule'
import { InformationBarAmbiente } from '../components/InformationBar/InformationBarAmbiente'
import { ScheduleEnvironment } from '../components/Schedule/ScheduleEnvironment'

export const SeeScheduleAmbiente = () => {
  return (
    <>
        <NavBar/>
        {/*los estilos del container horarios estan en SeeSchedule.css*/}
        <main className="container_all_horario2">
            <InformationBarAmbiente />
            <ScheduleEnvironment />
        </main>
    </>
  )
}
