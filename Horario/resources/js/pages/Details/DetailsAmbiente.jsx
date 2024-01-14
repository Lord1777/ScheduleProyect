import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import '../../../css/Details/DetailsAmbiente.css';
import useDropdown from '../../hooks/useDropdown.js';
import useFetchPostEnvironment from '../../hooks/FetchPOST/useFetchPostEnvironment.js';
import { useState } from 'react';

export const DetailsAmbiente = () => {

    {/*En proceso*/}
    
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

    const { fetchSubmitEnvironment } = useFetchPostEnvironment();

    const handleSubmit = (data) => {
        // fetchSubmitEnvironment()
        data.preventDefault()
    }

    return (
        <>
            <NavBar></NavBar>

            <main className='container_form_add_ambiente'>
                <div className='box_form_ambiente'>
                    <h2 className='title_underline'>Detalles del Ambiente</h2>
                    <div className='container_form_add'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid-column'>
                                <input
                                    type="number"
                                    name='ambiente'
                                    onChange={(e) => setAmbiente(e.target.value)}
                                    value='115'
                                />

                                <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='aireAcondicionado'
                                        className='textBox'
                                        readOnly
                                        onClick={dropdown1.handleDropdown}
                                        value='Aire Acondicionado - Si'
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
                                    onChange={(e) => setCapacidad(e.target.value)}
                                    value='40'
                                />

                                <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='videoBeam'
                                        className='textBox'
                                        readOnly
                                        onClick={dropdown2.handleDropdown}
                                        value='Video Beam - Si'
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
                                    onChange={(e) => setCantidadMesas(e.target.value)}
                                    value='16'
                                />

                                <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='sede'
                                        className='textBox'
                                        readOnly
                                        onClick={dropdown3.handleDropdown}
                                        value='CBI'
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
                                    onChange={(e) => setCantidadComputadores(e.target.value)}
                                    value='29'
                                />

                                <div className={`Dropdown ${dropdown4.isDropdown ? 'open' : ''}`}>
                                    <input
                                        type='text'
                                        name='tablero'
                                        className='textBox'
                                        readOnly
                                        onClick={dropdown4.handleDropdown}
                                        value='Tablero - Si'
                                        onChange={(e) => setTablero(e.target.value)}
                                    />
                                    <div className={`options ${dropdown4.isDropdown ? 'open' : ''}`}>
                                        <div onClick={() => dropdown4.handleOptionClick('Si')}>Si</div>
                                        <div onClick={() => dropdown4.handleOptionClick('No')}>No</div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-btns">
                                <button type='submit' className='guardar'>Editar</button>
                                <button className='cancelar'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
