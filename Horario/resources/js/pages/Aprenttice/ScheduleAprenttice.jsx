import React from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { InformationBarAprenttice } from "../../components/InformationBar/InformationBarAprenttice";
import { SeeSchedule } from "../../components/Schedule/SeeSchedule";
import { FilterScheduleFichaContextProvider } from '../../context/FilterScheduleFichaContext';

export const ScheduleAprenttice = () => {
    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <InformationBarAprenttice />
                <SeeSchedule />
            </main>
        </>
    );
};
