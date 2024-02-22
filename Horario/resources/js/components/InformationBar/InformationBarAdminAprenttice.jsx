import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord'
import '../../../css/InformationBar/InformationBarAprenttice.css'
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';
import { useFetchPutManageSchedule } from '../../hooks/FetchPUT/useFetchPutManageSchedule';

export const InformationBarAdminAprenttice = () => {

    const { idFicha, idHorario, manage } = useParams();
    // const { totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleFichaContext);

    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha /*, setHorasAsignadasValue*/);
    const { fetchManageSchedule } = useFetchPutManageSchedule();

    const rol = localStorage.getItem('role');

    const updateHorasAsignadas = () => {
        setHorasAsignadasValue(totalSeleccionado);
    };

    const disableSchedule = async (idHorario) => {
        await fetchManageSchedule('/disableSchedule', idHorario);
    }

    const enableSchedule = async (idHorario) => {
        await fetchManageSchedule('/enableSchedule', idHorario);
    }

    return (
        <>
            <div className="informationBarAprenttice">
                <div className="programa-nFicha">
                    <div>
                        <p><b>Programa de Formación:</b> {dataInfoRecord.nombre}</p>
                    </div>
                    <div>
                        <p><b>Ficha:</b> {dataInfoRecord.ficha}</p>
                        {
                            rol === 'coordinador' ?
                                (
                                    <>
                                        <Link to={`/ScheduleUpdateFicha/${idFicha}/${idHorario}/${dataInfoRecord.idTrimestre}`} >
                                            <button>Editar</button>
                                        </Link>
                                        <button onClick={() => manage === 'true' ? enableSchedule(idHorario) : disableSchedule(idHorario)}>
                                            {manage === 'true' ? 'Habilitar' : 'Inhabilitar'}
                                        </button>
                                    </>
                                )
                                :
                                ''
                        }
                    </div>
                </div>
                <div className="trimestre-jornada-horas">
                    <div>
                        <p><b>Trimestre:</b> {dataInfoRecord.trimestre}</p>
                    </div>
                    <div>
                        <p><b>Fecha inicio:</b> {dataInfoRecord.fechaInicio}</p>
                    </div>
                    <div>
                        <p><b>Fecha final:</b> {dataInfoRecord.fechaFinal}</p>
                    </div>
                    <div>
                        <p><b>Horas semanales:</b> {/*totalSeleccionado*/}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
