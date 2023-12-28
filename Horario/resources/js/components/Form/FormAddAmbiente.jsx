import React, { useState } from 'react'
import useDropdown from '../../hooks/useDropdown';
import '../../../css/Form/FormAddAmbiente.css'


export const FormAddAmbiente = () => {

    const getHeadquartersByName = (name) =>{

        const headquarters ={
            CBI: 2,
            Industrial: 1,
        }

        return headquarters[name]
    }

    const dropdown1 = useDropdown();
    const dropdown2 = useDropdown();
    const dropdown3 = useDropdown();
    const dropdown4 = useDropdown();

    const [sede, setSede] = useState(null);
    const [tablero, setTablero] = useState(null);
    const [ambiente, setAmbiente] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [videoBeam, setVideoBeam] = useState(null);
    const [cantidadMesas, setCantidadMesas] = useState(null);
    const [aireAcondicionado, setAireAcondicionado] = useState(null);
    const [cantidadComputadores, setCantidadComputadores] = useState(null);

    
    return (
        <>
            <main className='container_form_add_ambiente'>
                <div className='box_form_ambiente'>
                    <h2 className='title_underline'>Registro de Ambientes</h2>
                    <div className='container_form_add'>
                        <form method='POST'>
                            <div className='grid-column'>
                                <input
                                    type="number"
                                    name='ambiente'
                                    placeholder='Numero del Ambiente'
                                    onChange={(e) => setAmbiente(e.target.value)}

                                />

                                <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='aireAcondicionado'
                                        className='textBox'
                                        placeholder='Aire Acondicionado'
                                        readOnly
                                        onClick={dropdown1.handleDropdown}
                                        value={dropdown1.selectedOption}
                                        onChange={(e) => setAireAcondicionado(e.target.value)}
                                    />
                                    <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown1.handleOptionClick('Si')}>Si</div>
                                        <div onClick={() => dropdown1.handleOptionClick('No')}>No</div>
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    name="capacidad"
                                    placeholder='Capadidad del Ambiente'
                                    onChange={(e) => setCapacidad(e.target.value)}
                                />

                                <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='videoBeam'
                                        className='textBox'
                                        placeholder='Video Beam'
                                        readOnly
                                        onClick={dropdown2.handleDropdown}
                                        value={dropdown2.selectedOption}
                                        onChange={(e) => setVideoBeam(e.target.value)}
                                    />
                                    <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown2.handleOptionClick('Si')}>Si</div>
                                        <div onClick={() => dropdown2.handleOptionClick('No')}>No</div>
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    name="cantidadMesas"
                                    placeholder='Cantidad Mesas'
                                    onChange={(e) => setCantidadMesas(e.target.value)}
                                />

                                <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='sede'
                                        className='textBox'
                                        placeholder='Sede'
                                        readOnly
                                        onClick={dropdown3.handleDropdown}
                                        value={dropdown3.selectedOption}
                                        onChange={(e) => setSede(e.target.value)}
                                    />
                                    <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown3.handleOptionClick('CBI')}>CBI</div>
                                        <div onClick={() => dropdown3.handleOptionClick('Industrial')}>Industrial</div>
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    name="cantidadComputadores"
                                    placeholder='Cantidad Computadores'
                                    onChange={(e) => setCantidadComputadores(e.target.value)}
                                />

                                <div className={`Dropdown ${dropdown4.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='tablero'
                                        className='textBox'
                                        placeholder='Tablero'
                                        readOnly
                                        onClick={dropdown4.handleDropdown}
                                        value={dropdown4.selectedOption}
                                        onChange={(e) => setTablero(e.target.value)}
                                    />
                                    <div className={`options ${dropdown4.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown4.handleOptionClick('Si')}>Si</div>
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
