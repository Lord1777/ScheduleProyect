import React, { useContext } from 'react';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { useParams } from 'react-router-dom';
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord';
import '../../../css/InformationBar/InformationBarAprenttice.css';
import error from '../../assets/img/Advertencia.png';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';


export const InformationBarAprenttice = () => {

    const { idFicha } = useParams();
    const { totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleFichaContext);

    const { 
        dataInfoRecord,
        modalOpen,
        setModalOpen,
        alertMessage,
        ruta,
    } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha);

    const updateHorasAsignadas = () => {
        setHorasAsignadasValue(totalSeleccionado);
    };

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
                        <p><b>Horas semanales: </b>{totalSeleccionado}</p>
                    </div>
                </div>
            </div>
            <ContinuoModal
            tittle="Aviso"
            imagen={error}
            message={alertMessage}
            open={modalOpen}
            close={() => setModalOpen(false)}
            route={ruta}
            />
        </>
    )
}
