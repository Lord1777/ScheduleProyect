import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { ScheduleUpdateFicha } from '../components/Schedule/ScheduleUpdateFicha'
import { FilterScheduleFichaContextProvider } from '../context/FilterScheduleFichaContext'

export const ManageScheduleUpdateFicha = () => {

  return (
    <>
        <NavBar />
        <main className="container_all_horario2">
          <FilterScheduleFichaContextProvider>
            <ScheduleUpdateFicha />
          </FilterScheduleFichaContextProvider>
        </main>
    </>
  )
}
