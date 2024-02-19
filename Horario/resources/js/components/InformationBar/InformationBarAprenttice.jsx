import React, { useContext, useEffect } from 'react'
import '../../../css/InformationBar/InformationBarAprenttice.css'
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord'
import { Link, useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';

export const InformationBarAprenttice = () => {

    const { idFicha, idHorario } = useParams();

    // const { idBoxIndex, setIdBoxIndexValue } = useContext(FilterScheduleFichaContext);

    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha);

    const { user } = useUser();

    const rol = localStorage.getItem('role');

    // useEffect(() => {
    //     // Supongamos que dataSchedule es la información de los horarios obtenida del componente SeeSchedule
    //     const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

    //     // Calcular la cantidad total de horas semanales
    //     const totalSeleccionado = selectedSchedules.length;

    //     // Actualizar el contexto con el total de horas
    //     setIdBoxIndexValue(totalSeleccionado);
    // }, [dataSchedule, setIdBoxIndexValue]);


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
                                <Link to={`/ScheduleUpdateFicha/${idFicha}/${idHorario}/${dataInfoRecord.idTrimestre}`} >
                                    <button>Editar</button>
                                </Link>
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
                    <p><b>Horas semanales:</b></p>
                </div>
            </div>
        </div>
    </>
  )
}
