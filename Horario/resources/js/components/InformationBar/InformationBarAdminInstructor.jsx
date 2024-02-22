import React, { useContext, useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import useDropdownGet from '../../hooks/useDropdownGet';
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import '../../../css/InformationBar/InformationBar.css';
import { useForm } from 'react-hook-form';
import { useFetchGetRecords } from '../../hooks/FetchGetResources/useFetchGetRecords';
import useDropdown from '../../hooks/useDropdown';


export const InformationBarAdminInstructor = () => {


    // const trimestreDropdown = useTrimestreDropdown();
    const { register, setValue } = useForm()
    const dropdown1 = useDropdown(setValue, "fichaProgram");
    const dropdown2 = useDropdown(setValue, "trimestres");

    const { setIdTrimestreValue, totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleInstructorContext);
    const [searchProgram, setSearchPogram] = useState('');


    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { dataRecords } = useFetchGetRecords('/getRecords');
    // console.log(dataRecords)

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
                <div className='container-instructor'>
                    <h3>Instructor: Ok</h3>
                </div>

                <div className="deplegable-horas">

                    <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='trimestres'
                            placeholder='Trimestres'
                            readOnly
                            onClick={dropdown2.handleDropdown}
                            value={dropdown2.selectedOption}
                            {...register("trimestres")}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                <div key={quarter.idTrimestre} onClick={() => {
                                    dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                    handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                }}>
                                    {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`desplegable-infoBar ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type='text'
                            className='textBox'
                            placeholder='Programa de Formación'
                            name='programa'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            value={dropdown1.selectedOption}
                            {...register("programa")}
                        />
                        <div className={`desplegable-options-form ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    className='buscador-desplegables-form'
                                    id='buscador-form'
                                    value={searchProgram}
                                    onChange={(e) => setSearchPogram(e.target.value)}
                                    name='fichaProgram'
                                    {...register("fichaProgram")}
                                />
                            </div>

                            <div className="contenedor-options-form">
                                {dataRecords && dataRecords.length > 0 && dataRecords
                                    .filter((record) =>
                                        `${record.nombre}`.toLowerCase().startsWith(searchProgram.toLowerCase()) ||
                                        `${record.ficha}`.toLowerCase().startsWith(searchProgram.toLowerCase())
                                    )
                                    .map((record) => (
                                        <div key={record.idFicha} className='option' onClick={() => dropdown1.handleOptionClick(`${record.ficha} - ${record.nombre}`)}>
                                            {record.ficha} - {record.nombre}
                                        </div>
                                    ))}
                            </div>

                        </div>
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