import React from 'react'
import useDropdown from '../../hooks/useDropdown';
import '../../../css/Form/FormAddAmbiente.css'


export const FormAddAmbiente = () => {

    const dropdown1 = useDropdown();
    const dropdown2 = useDropdown();
    const dropdown3 = useDropdown();
    const dropdown4 = useDropdown();

    return (
        <>
            <main className='container_form_add_ambiente'>
                <div className='box_form_ambiente'>
                    <h2 className='title_underline'>Registro de Ambientes</h2>
                    <div className='container_form_add'>
                        <form method='POST'>
                            <div className='grid-column'>
                                <input type="number" name='Ambiente' placeholder='Numero del Ambiente'/>

                                <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Aire Acondicionado'
                                        readOnly
                                        onClick={dropdown1.handleDropdown}
                                        value={dropdown1.selectedOption}
                                    />
                                    <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown1.handleOptionClick('Si')}>Sil</div>
                                        <div onClick={() => dropdown1.handleOptionClick('No')}>No</div>
                                    </div>
                                </div>

                                <input type="number" name="Capacidad" placeholder='Capadidad del Ambiente'/>

                                <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Video Beam'
                                        readOnly
                                        onClick={dropdown2.handleDropdown}
                                        value={dropdown2.selectedOption}
                                    />
                                    <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown2.handleOptionClick('Si')}>Sil</div>
                                        <div onClick={() => dropdown2.handleOptionClick('No')}>No</div>
                                    </div>
                                </div>

                                <input type="number" name="Capacidad" placeholder='Cantidad Mesas'/>

                                <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Sede'
                                        readOnly
                                        onClick={dropdown3.handleDropdown}
                                        value={dropdown3.selectedOption}
                                    />
                                    <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown3.handleOptionClick('Si')}>CBI</div>
                                        <div onClick={() => dropdown3.handleOptionClick('No')}>Industria</div>
                                    </div>
                                </div>

                                <input type="number" name="Capacidad" placeholder='Cantidad Computadores'/>

                                <div className={`Dropdown ${dropdown4.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        className='textBox'
                                        placeholder='Tablero'
                                        readOnly
                                        onClick={dropdown4.handleDropdown}
                                        value={dropdown4.selectedOption}
                                    />
                                    <div className={`options ${dropdown4.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown4.handleOptionClick('Si')}>Sil</div>
                                        <div onClick={() => dropdown4.handleOptionClick('No')}>No</div>
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
    )
}
