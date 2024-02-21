import React from "react";
import { InformationBarAdminAprenttice } from "../components/InformationBar/InformationBarAdminAprenttice";
import { SeeScheduleAdmin } from "../components/Schedule/SeeScheduleAdmin";
import { NavBar } from "../components/NavBar/NavBar";
import { FilterScheduleFichaContextProvider } from "../context/FilterScheduleFichaContext";

export const ScheduleAdminAprenttice = () => {
    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <FilterScheduleFichaContextProvider>
                    <InformationBarAdminAprenttice/>
                    <SeeScheduleAdmin/>
                </FilterScheduleFichaContextProvider>
            </main>
        </>
    );
};
