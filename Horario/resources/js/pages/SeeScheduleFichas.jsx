import React from 'react'
import { NavBar } from '../components/NavBar/NavBar';
import { SeeSchedule } from '../components/Schedule/SeeSchedule';
import { InformationBarFichas } from '../components/InformationBar/InformationBarFichas';
// import FilterScheduleFichaContextProvider from '../context/FilterScheduleFichaContext';

export const SeeScheduleFichas = () => {
    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                {/* <FilterScheduleFichaContextProvider> */}
                    <InformationBarFichas />
                    <SeeSchedule />
                {/* </FilterScheduleFichaContextProvider> */}
            </main>
        </>
    )
}
