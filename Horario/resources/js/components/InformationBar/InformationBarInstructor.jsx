import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import React, { useState, useContext, useEffect } from 'react';
import { useFetchGetRecords } from '../../hooks/FetchGetResources/useFetchGetRecords';
import useDropdown from '../../hooks/useDropdown';
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import '../../../css/InformationBar/InformationBar.css';
import { useParams } from 'react-router-dom';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import { useForm } from 'react-hook-form';

export const InformationBarInstructor = () => {

    const { register, setValue } = useForm();
    const dropdown1 = useDropdown(setValue, 'fichas');
    const dropdown2 = useDropdown(setValue, 'trimestres');
    const trimestreDropdown = useTrimestreDropdown();

    const { setIdTrimestreValue, setIdFichaValue, totalSeleccionado, setHorasAsignadasValue  } = useContext(FilterScheduleInstructorContext);

    const { dataRecords } = useFetchGetRecords('/getRecords');
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { idUsuario } = useParams();
    const { dataInstructor } = useFetchGetInstructor(`/getInstructor/${idUsuario}`);
   


    // const rol = localStorage.getItem('role');

    const getRecordId = (nombreRecord) => {
        const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
        return record ? record.idFicha : null;
    }
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    //Buscador
    const [fichaPrograma, setFichaPrograma] = useState("");
    const [fichas, setFichas] = useState("");
    const [totalHoras, setTotalHoras] = useState("");

    const handleOptionClickTrimestre = (selectedOption) => {
        setIdTrimestreValue(getQuarterId(selectedOption));
    }

    const handleOptionClickFicha = (selectedOption) => {
        setIdFichaValue(getRecordId(selectedOption));
    }

    const updateHorasAsignadas = () => {

        setHorasAsignadasValue((prevTotal) => {
            if (prevTotal !== totalSeleccionado) {
                return totalSeleccionado;
            }
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
                    <div>
                        <h3>Instructor: {dataInstructor.nombreCompleto}</h3>
                    </div>
                    <div>
                        <h3>Limite de horas: {dataInstructor.limiteHoras}</h3>
                        <h3>Horas asignadas: {totalSeleccionado}</h3>
                    </div>
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
                            {...register('trimestres')}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                <div key={quarter.idTrimestre} onClick={() =>
                                    handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)}>
                                    {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className={`desplegable1 ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='fichas'
                            placeholder='Fichas'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            onChange={(e) => setFichaPrograma(e.target.value)}
                            value={dropdown1.selectedOption}
                            {...register('fichas')}
                        />
                        <div className={`desplegable-options1 ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    className='buscador-desplegables'
                                    id='buscador'
                                    value={fichas}
                                    onChange={(e) => setFichas(e.target.value)}
                                />
                            </div>

                            <div className="contenedor-options">
                                {dataRecords && dataRecords.length > 0 && dataRecords
                                    .filter((record) =>
                                        `${record.nombre}`.toLowerCase().startsWith(fichas.toLowerCase())
                                        ||
                                        `${record.ficha}`.toLowerCase().startsWith(fichas.toLowerCase())
                                    )
                                    .map((record) => (
                                        <div key={record.idFicha} className='option' onClick={() => handleOptionClickFicha(`${record.ficha} - ${record.nombre}`)}>
                                            {record.ficha} - {record.nombre}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtrar por <Trimestres></Trimestres></h3></label>
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
