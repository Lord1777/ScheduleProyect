import React, { useContext, useState } from 'react';
import { useFetchPutManageSchedule } from '../../hooks/FetchPUT/useFetchPutManageSchedule';
import { Link, useParams } from 'react-router-dom';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { Loading } from '../Loading/Loading';
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord'
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';
import exito from '../../assets/img/Exito.png'
import '../../../css/InformationBar/InformationBarAprenttice.css'

export const InformationBarAdminAprenttice = () => {

    const [ loading, setLoading ] = useState(false);
    const { idFicha, idHorario, manage } = useParams();
    const { totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleFichaContext);

    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha, setHorasAsignadasValue);
    const { fetchManageSchedule, successModalOpen, closeSuccessModal, alertMessage } = useFetchPutManageSchedule();

    const rol = localStorage.getItem('role');

    const updateHorasAsignadas = () => {
        setHorasAsignadasValue(totalSeleccionado);
    };

    const disableSchedule = async (idHorario) => {
        setLoading(true)
        await fetchManageSchedule('/disableSchedule', idHorario);
        setLoading(false)
    }

    const enableSchedule = async (idHorario) => {
        setLoading(true)
        await fetchManageSchedule('/enableSchedule', idHorario);
        setLoading(false)
    }

    if(loading){
        return <Loading/>
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
                            manage != undefined ?
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
                                (
                                    <>
                                        <Link to={`/ScheduleUpdateFicha/${idFicha}/${idHorario}/${dataInfoRecord.idTrimestre}`} >
                                            <button>Editar</button>
                                        </Link>
                                    </>
                                )
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
                        <p><b>Horas semanales:</b> {totalSeleccionado}</p>
                    </div>
                    {
                        rol === 'coordinador' ?
                            (
                                <>
                                <div className='buttons-container'>
                                   <Link to={`/ScheduleUpdateFicha/${idFicha}/${idHorario}/${dataInfoRecord.idTrimestre}`} >
                                        <button>Editar</button>
                                    </Link>
                                    <button onClick={() => manage === 'true' ? enableSchedule(idHorario) : disableSchedule(idHorario)}>
                                        {manage === 'true' ? 'Habilitar' : 'Inhabilitar'}
                                    </button> 
                                </div>
                                </>
                            )
                            :
                            ''
                    }
                </div>
            </div>
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message={alertMessage}
                open={successModalOpen}
                close={closeSuccessModal}
                route="/HorariosFichas"
            />
        </>
    )
}
