import React, { useContext, useEffect } from 'react';
import useDropdownGet from '../../hooks/useDropdownGet'
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import FilterScheduleAmbienteContext from '../../context/FilterScheduleAmbienteContext';
import { useFetchGetOneEnvironment } from '../../hooks/FetchGET/useFetchGetOneEnvironment';
import { useParams } from 'react-router-dom';

export const InformationBarAmbiente = () => {

    // const dropdown1 = useDropdownGet();
    // const dropdown2 = useDropdownGet();
    // const trimestreDropdown = useTrimestreDropdown();

    const { idAmbiente, idTrimestre } = useParams();

    const { totalSeleccionado, setHorasAsignadasValue, environmentColors } = useContext(FilterScheduleAmbienteContext);

    const { dataEnvironment } = useFetchGetOneEnvironment(`/getEnvironment`, idAmbiente);
    console.log(dataEnvironment);

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

                    {/* <div className={`desplegable ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Ambiente'
                            placeholder='Ambientes'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            value={dropdown1.selectedOption}
                        />
                        <div className={`desplegable-options ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div onClick={() => dropdown1.handleOptionClick('Cedula')}>Cédula</div>
                            <div onClick={() => dropdown1.handleOptionClick('Cedula de Extranjeria')}>Cédula de Extranjería</div>
                        </div>
                    </div>


                    <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Trimestres'
                            placeholder='Trimestres'
                            readOnly
                            onClick={dropdown2.handleDropdown}
                            value={dropdown2.selectedOption}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <div onClick={() => dropdown2.handleOptionClick('Cedula')}>Cédula</div>
                            <div onClick={() => dropdown2.handleOptionClick('Cedula de Extranjeria')}>Cédula de Extranjería</div>
                        </div>
                    </div> */}

                    <div>
                        <h3>Ambiente: <span>{dataEnvironment.ambiente}</span></h3>
                        <h3>Sede: <span>{dataEnvironment.sede}</span></h3>
                    </div>


                    <div>
                        <h3>Horas Asignadas: <span>{totalSeleccionado}</span></h3>
                    </div>
                </div>

                <div className='colorRecords'>
                    {
                        environmentColors && Object.entries(environmentColors).map(([clave, valor]) => (
                            <>
                                <div key={clave} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <p style={{ marginRight: '10px' }}>{clave}:</p>
                                    <div style={{ width: '20px', height: '15px', backgroundColor: valor }}></div>
                                </div>
                            </>
                        ))
                    }
                </div>
                {/* <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtra por Trimestres</h3></label>
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
