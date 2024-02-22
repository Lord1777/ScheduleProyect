import React, { useContext, useEffect } from 'react';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import '../../../css/InformationBar/InformationBar.css';
import { useParams } from 'react-router-dom';

export const InformationBarAdminInstructor = () => {

    const { setIdTrimestreValue, totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleInstructorContext);

    const { idUsuario } = useParams();
    const { dataInstructor } = useFetchGetInstructor(`/getInstructor/${idUsuario}`)
    console.log(dataInstructor);
    
    const rol = localStorage.getItem('role');

    const getRecordId = (nombreRecord) => {
        const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
        return record ? record.idFicha : null;
    }
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    const handleOptionClickTrimestre = (selectedOption) => {
        setIdTrimestreValue(getQuarterId(selectedOption));
    }

    const updateHorasAsignadas = () => {

        setHorasAsignadasValue((prevTotal) => {
            if (prevTotal !== totalSeleccionado) {
                return totalSeleccionado;
            }
            return prevTotal;
        });
    };

    useEffect(() => {
        updateHorasAsignadas();
    }, [totalSeleccionado, setHorasAsignadasValue]);

    return (
        <>
            <div className="information_bar">
                <div className="deplegable-horas">
                    <div>
                        <h3>Instructor: {dataInstructor.nombreCompleto}</h3>
                        <h3>Limite de horas: {dataInstructor.limiteHoras}</h3>
                    </div>
                    <div>
                        <h3>Horas asignadas: {totalSeleccionado}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationBarAdminInstructor;