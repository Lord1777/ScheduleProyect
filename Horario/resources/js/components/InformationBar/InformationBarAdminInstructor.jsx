import React, { useContext, useEffect } from 'react';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import useDropdownGet from '../../hooks/useDropdownGet';
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';

import '../../../css/InformationBar/InformationBar.css';

export const InformationBarAdminInstructor = () => {

    // const dropdown2 = useDropdownGet();
    // const trimestreDropdown = useTrimestreDropdown();

    const { setIdTrimestreValue, totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleInstructorContext);

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

    const handleOptionClickTrimestre = (selectedOption) => {
        setIdTrimestreValue(getQuarterId(selectedOption));
    }
    
    const updateHorasAsignadas = () => {
        setHorasAsignadasValue(totalSeleccionado);
    };

    useEffect(() => {
        updateHorasAsignadas();
    }, [totalSeleccionado, setHorasAsignadasValue]);
    
    return (
        <>
            <div className="information_bar">
                <div className="deplegable-horas">
{/*                     
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
                        </div> */}
                    <div>
                        <h3>Instructor: Ok</h3>
                    </div>
    
                    <div>
                        <h3>Total de Horas: {totalSeleccionado}</h3>
                    </div>
                </div>
                {/* <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtrar por Trimestres</h3></label>
                    <input
                        className='custom-checkbox'
                        id="trimestresCheckbox"
                        type="checkbox"
                        onChange={trimestreDropdown.toggleTrimestreDropdown} />
                </div> */}
            </div>
        </>
    )
}

export default InformationBarAdminInstructor;