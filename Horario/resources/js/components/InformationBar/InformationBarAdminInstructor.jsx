import React, { useContext, useEffect } from 'react';
import { useUser } from '../../context/UserContext'
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import useDropdownGet from '../../hooks/useDropdownGet';
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import '../../../css/InformationBar/InformationBar.css';
import { useParams } from 'react-router-dom';

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

    // const handleOptionClickTrimestre = (selectedOption) => {
    //     setIdTrimestreValue(getQuarterId(selectedOption));
    // }

    const updateHorasAsignadas = () => {
        // Utiliza la última versión de totalSeleccionado directamente del contexto
        setHorasAsignadasValue((prevTotal) => {
            // Si prevTotal es diferente de totalSeleccionado, entonces actualiza
            if (prevTotal !== totalSeleccionado) {
                return totalSeleccionado;
            }
            // Si son iguales, no hay necesidad de actualizar
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