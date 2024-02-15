import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { ScheduleUpdateFicha } from '../components/Schedule/ScheduleUpdateFicha'

export const ManageScheduleUpdateFicha = () => {

  return (
    <>
        <NavBar />
        <main className="container_all_horario2">
            <ScheduleUpdateFicha />
        </main>
    </>
  )
}
