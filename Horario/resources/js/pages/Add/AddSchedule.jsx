import React from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { ScheduleAdd } from '../../components/Schedule/ScheduleAdd'

export const AddSchedule = () => {
  return (
    <>
        <NavBar/>
        {/*los estilos del container horarios estan en SeeSchedule.css*/}
        <main className="container_all_hoario">
            <ScheduleAdd/>
        </main>
    </>
  )
}
