import React from 'react'
import '../../../css/InformationBar/InformationBarAprenttice.css'
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord'
import { useParams } from 'react-router-dom'

export const InformationBarAprenttice = () => {

    const { idFicha } = useParams();

    console.log(idFicha)

    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha);

    console.log(dataInfoRecord);

  return (
    <>
        <div className="informationBarAprenttice">
            <div className="programa-nFicha">
                <div>
                    <p>Programa de Formación: Analisis y Desarrollo de Software</p>
                </div>
                <div>
                    <p>Ficha: 2560354</p>
                </div>
            </div>
            <div className="trimestre-jornada-horas">
                <div>
                    <p>Trimestre: 3</p>
                </div>
                <div>
                    <p>Fecha inicio: Diurna</p>
                </div>
                <div>
                    <p>Fecha final: Nocturna</p>
                </div>
                <div>
                    <p>Horas Semanales: 32</p>
                </div>
            </div>
        </div>
    </>
  )
}
