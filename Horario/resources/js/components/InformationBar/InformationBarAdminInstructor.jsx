import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDropdownGet from '../../hooks/useDropdownGet';
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';

import '../../../css/InformationBar/InformationBar.css';

export const InformationBarAdminInstructor = () => {

    const dropdown2 = useDropdownGet();
    const trimestreDropdown = useTrimestreDropdown();

    const { idUsuario } = useParams();

    const { setIdTrimestreValue, setHorasAsignadasValue } = useContext(FilterScheduleInstructorContext);

    const { dataQuarters } = useFetchGetQuarters('/getQuarters');

    const rol = localStorage.getItem('role');

    const getRecordId = (nombreRecord) => {
        const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
        return record ? record.idFicha : null;
    }
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    const [totalHoras, setTotalHoras] = useState("");

    const handleOptionClickTrimestre = (selectedOption) => {
        setIdTrimestreValue(getQuarterId(selectedOption));
    }
    
    const updateHorasAsignadas = () => {
        const horasAsignadas = setHorasAsignadasValue(); // Asumiendo que setHorasAsignadasValue es asíncrono
        setTotalHoras(horasAsignadas); // Actualiza las horas asignadas en el contexto
    };

    useEffect(() => {
        // Actualiza las horas asignadas cuando cambian
        updateHorasAsignadas();
    }, [setHorasAsignadasValue]);
    
    return (
        <>
            <div className="information_bar">
                <div className="deplegable-horas">

                    {trimestreDropdown.showTrimestreDropdown && (
                        <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='trimestres'
                                placeholder='Trimestres'
                                readOnly
                                onClick={dropdown2.handleDropdown}
                                value={dropdown2.selectedOption}
                            />
                            <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                    <div key={quarter.idTrimestre} onClick={() =>
                                        handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)}>
                                        {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3>Total de Horas: {totalHoras || '...'}</h3>
                    </div>
                </div>
                <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtrar por Trimestres</h3></label>
                    <input
                        className='custom-checkbox'
                        id="trimestresCheckbox"
                        type="checkbox"
                        onChange={trimestreDropdown.toggleTrimestreDropdown} />
                </div>
            </div>
        </>
    )
}
