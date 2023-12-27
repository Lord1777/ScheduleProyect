import React from 'react';
import '../../../css/Form/BoxContainerFormAdd.css';
import '../../../css/Form/FormAddFicha.css';
import useDropdown from '../../hooks/useDropdown';

export const FormAddFicha = () => {
    const dropdown1 = useDropdown();
    const dropdown2 = useDropdown();
    const dropdown3 = useDropdown();

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Registro de Ficha</h2>
                    <div className='container_form_add'>
                        <form method='POST'>
                            <div className='grid-column'>
                                <input type='number' name='NFicha' placeholder='N° Ficha' />

                                <input type='number' name='Duracion' placeholder='Duración' />

                                <input type='text' name='Programa' placeholder='Programa' />

                                <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Modalidad'
                                        readOnly
                                        onClick={dropdown1.handleDropdown}
                                        value={dropdown1.selectedOption}
                                    />
                                    <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown1.handleOptionClick('Presencial')}>Presencial</div>
                                        <div onClick={() => dropdown1.handleOptionClick('Virtual')}>Virtual</div>
                                    </div>
                                </div>

                                <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Nivel de Formación'
                                        readOnly
                                        onClick={dropdown2.handleDropdown}
                                        value={dropdown2.selectedOption}
                                    />
                                    <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown2.handleOptionClick('Tecnico')}>Técnico</div>
                                        <div onClick={() => dropdown2.handleOptionClick('Tecnologo')}>Tecnólogo</div>
                                    </div>
                                </div>

                                <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Jornada Académica'
                                        readOnly
                                        onClick={dropdown3.handleDropdown}
                                        value={dropdown3.selectedOption}
                                    />
                                    <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown3.handleOptionClick('Diurna')}>Diurna</div>
                                        <div onClick={() => dropdown3.handleOptionClick('Nocturna')}>Nocturna</div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-btns">
                                <button className='guardar'>Guardar</button>
                                <button className='cancelar'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
