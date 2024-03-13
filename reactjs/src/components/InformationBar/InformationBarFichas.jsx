import React from 'react'
import '../../../css/InformationBar/InformationBar.css'
import useDropdownGet from '../../hooks/useDropdownGet';


export const InformationBarFichas = () => {

    const dropdown1 = useDropdownGet();
    const dropdown2 = useDropdownGet();

    return (
        <>
            <div className="information_bar">
                <div className="deplegable-horas">

                    <div className={`desplegable ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Instructor'
                            placeholder='Instructores'
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
                        </div>
                    

                    <div>
                        <h3>Total de Horas: 36</h3>
                    </div>
                </div>
                {/* <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtra por Trimestres</h3></label>
                    <input 
                    className='custom-checkbox'
                    id="trimestresCheckbox"
                    type="checkbox"
                    onChange={trimestreDropdown.toggleTrimestreDropdown}/>
                </div> */}
            </div>
        </>
    )
}
