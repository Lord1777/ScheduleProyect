import React from 'react'
import { NavBar } from '../../components/NavBar/NavBar';
import { InformationBarAprenttice } from '../../components/InformationBar/InformationBarAprenttice';
import { SeeSchedule } from '../../components/Schedule/SeeSchedule';
import { useParams } from 'react-router-dom';


export const ScheduleAprenttice = () => {

    const { idFicha } = useParams();

    return (
        <>
            <NavBar />
            {/*los estilos del container horarios estan en SeeSchedule.css*/}
            <main className="container_all_horario2">
                <InformationBarAprenttice
                    idFicha={idFicha}
                />
                <SeeSchedule
                    idFicha={idFicha}
                />
            </main>
        </>
    )
}
