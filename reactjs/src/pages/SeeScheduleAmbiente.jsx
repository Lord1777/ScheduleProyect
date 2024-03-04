import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { InformationBarAmbiente } from '../components/InformationBar/InformationBarAmbiente'
import { ScheduleEnvironment } from '../components/Schedule/ScheduleEnvironment'
import { FilterScheduleAmbienteContextProvider } from '../context/FilterScheduleAmbienteContext'

export const SeeScheduleAmbiente = () => {
  return (
    <>
        <NavBar/>
        {/*los estilos del container horarios estan en SeeSchedule.css*/}
        <main className="container_all_horario2">
          <FilterScheduleAmbienteContextProvider>
             <InformationBarAmbiente />
             <ScheduleEnvironment />
          </FilterScheduleAmbienteContextProvider>
        </main>
    </>
  )
}
