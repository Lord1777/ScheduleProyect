import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import useDropdown from '../../hooks/useDropdown';
import '../../../css/Form/FormAddTrimestre.css';
import useFetchPostQuarter from '../../hooks/FetchPOST/useFetchPostQuarter';

function FormAddTrimestre() {

    const dropdown1 = useDropdown();
    const dropdown2 = useDropdown();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [trimestre, setTrimestre] = useState(null);

    const { fetchSubmitQuarter } = useFetchPostQuarter({ trimestre, fechaInicio: startDate, fechaFinal: endDate });

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchSubmitQuarter();
    }




    return (
        <>
            <main className='container_form_add_trimestre'>
                <div className='box_form_trimestre'>
                    <h2 className='title_underline'>Registro de Trimestre</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit} >
                            <div className='grid-column'>
                                <input type="number" name="trimestre" placeholder='N° Trimestre' onChange={(e) => setTrimestre(e.target.value)}/>

                                <div className="DatePicker">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        placeholderText='Fecha Inicial'
                                        popperPlacement='bottom'
                                        className="custom-datepicker"
                                    />
                                    <FontAwesomeIcon icon={faCalendar} className='icon-calendar'/>
                                </div>

                                <div className="DatePicker">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        placeholderText='Fecha Final'
                                        popperPlacement='bottom'
                                        className="custom-datepicker"
                                    />
                                    <FontAwesomeIcon icon={faCalendar} className='icon-calendar'/>
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
}

export default FormAddTrimestre;
