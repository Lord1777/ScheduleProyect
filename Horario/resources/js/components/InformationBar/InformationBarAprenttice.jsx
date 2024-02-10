import React from 'react'
import '../../../css/InformationBar/InformationBarAprenttice.css'
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord'
import { useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';

export const InformationBarAprenttice = () => {

    const { idFicha } = useParams();

    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha);

    const { user } = useUser();

    console.log(user);

    

  return (
    <>
        <div className="informationBarAprenttice">
            <div className="programa-nFicha">
                <div>
                    <p><b>Programa de Formación:</b> {dataInfoRecord.nombre}</p>
                </div>
                <div>
                    <p><b>Ficha:</b> {dataInfoRecord.ficha}</p>
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
                    <p><b>Horas semanales:</b> {dataInfoRecord.horasAsignadas}</p>
                </div>
            </div>
        </div>
    </>
  )
}
