import React, { useContext, useEffect } from 'react';
import useDropdownGet from '../../hooks/useDropdownGet'
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import FilterScheduleAmbienteContext from '../../context/FilterScheduleAmbienteContext';

export const InformationBarAmbiente = () => {

    // const dropdown1 = useDropdownGet();
    // const dropdown2 = useDropdownGet();
    // const trimestreDropdown = useTrimestreDropdown();

    const { totalSeleccionado, setHorasAsignadasValue } = useContext(FilterScheduleAmbienteContext);

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
                        <h3>Ambiente: {999}</h3>
                    </div>


                    <div>
                        <h3>Total de Horas: {totalSeleccionado}</h3>
                    </div>
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
