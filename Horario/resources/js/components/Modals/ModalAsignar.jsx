import React from 'react'
import '../../../css/Modals/ModalAsignar.css'
import useDropdownGet from '../../hooks/useDropdownGet'

export const ModalAsignar = ({openModal, closeModal}) => {
    if (!openModal) return null;

    const dropdown1 = useDropdownGet();
    const dropdown2 = useDropdownGet();

    return (
        <>
            <div className="shadow_box">
                <div className="box-modal-asignar">
                    <h3>Asignar Instructores y Ambientes</h3>

                    <div className={`desplegable ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Instructores'
                            placeholder='Seleccionar Instructor'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            value={dropdown1.selectedOption}
                        />
                        <div className={`desplegable-options ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div onClick={() => dropdown1.handleOptionClick('AGP')}>AGP</div>
                            <div onClick={() => dropdown1.handleOptionClick('DHM')}>DHM</div>
                        </div>
                    </div>

                    <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Ambiente'
                            placeholder='Seleccionar Ambientes'
                            readOnly
                            onClick={dropdown2.handleDropdown}
                            value={dropdown2.selectedOption}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <div onClick={() => dropdown2.handleOptionClick('115')}>115</div>
                            <div onClick={() => dropdown2.handleOptionClick('120')}>120</div>
                        </div>
                    </div>

                    <div className="container-buttons-modal">
                        <button className='Guardar'>Guardar</button>
                        <button className='Cancelar' onClick={closeModal}>Cancelar</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
