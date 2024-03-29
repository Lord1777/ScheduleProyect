import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
// import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import '../../../css/InformationBar/InformationBar.css';
import { useFetchGetOneQuarter } from '../../hooks/FetchGET/useFetchGetOneQuarter';

export const InformationBarAdminInstructor = () => {

    const { idUsuario, idTrimestre } = useParams();

    const { setIdTrimestreValue, totalSeleccionado, setHorasAsignadasValue, recordsColors } = useContext(FilterScheduleInstructorContext);
    const { dataInstructor } = useFetchGetInstructor(`/getInstructor/${idUsuario}`)
    // const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    // const { dataRecords } = useFetchGetRecords('/getRecords');
    const { dataQuarter } = useFetchGetOneQuarter(`/GetTrimestre/${idTrimestre}`);

    // const rol = localStorage.getItem('role');

    // const getRecordId = (nombreRecord) => {
    //     const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
    //     return record ? record.idFicha : null;
    // }

    // const getQuarterId = (dataTrimestre) => {
    //     const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
    //     return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    // };

    // const handleOptionClickTrimestre = (selectedOption) => {
    //     setIdTrimestreValue(getQuarterId(selectedOption));
    // }

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
                    <div className='hoursSchedule'>
                        <h3>Limite de horas: {dataInstructor.limiteHoras}</h3>
                        <h3>Horas asignadas: {totalSeleccionado}</h3>
                    </div>
                </div>

                <div className="trimestre-jornada-horas-horario">
                    <div>
                        <p><b>Trimestre:</b> {dataQuarter.trimestre}</p>
                    </div>
                    <div>
                        <p><b>Fecha inicio:</b> {dataQuarter.fechaInicio}</p>
                    </div>
                    <div>
                        <p><b>Fecha final:</b> {dataQuarter.fechaFinal}</p>
                    </div>
                </div>

                <div className='colorRecords'>
                    {
                        recordsColors && Object.entries(recordsColors).map(([clave, valor]) => (
                            <>
                                <div key={clave} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <p style={{ marginRight: '10px' }}>{clave}:</p>
                                    <div style={{ width: '20px', height: '15px', backgroundColor: valor, border: '1px black solid', borderRadius: '2px'  }}></div>
                                </div>
                            </>
                        ))
                    }
                </div>

                    {/* <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='trimestres'
                            placeholder='Trimestres'
                            readOnly
                            onClick={dropdown2.handleDropdown}
                            value={dropdown2.selectedOption}
                            {...register("trimestres")}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                <div key={quarter.idTrimestre} onClick={() => {
                                    dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                    handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                }}>
                                    {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`desplegable-infoBar ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type='text'
                            className='textBox'
                            placeholder='Programa de Formación'
                            name='programa'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            value={dropdown1.selectedOption}
                            {...register("programa")}
                        />
                        <div className={`desplegable-options-form ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    className='buscador-desplegables-form'
                                    id='buscador-form'
                                    value={searchProgram}
                                    onChange={(e) => setSearchPogram(e.target.value)}
                                    name='fichaProgram'
                                    {...register("fichaProgram")}
                                />
                            </div>
                            <div className="contenedor-options-form">
                                {dataRecords && dataRecords.length > 0 && dataRecords
                                    .filter((record) =>
                                        `${record.nombre}`.toLowerCase().startsWith(searchProgram.toLowerCase()) ||
                                        `${record.ficha}`.toLowerCase().startsWith(searchProgram.toLowerCase())
                                    )
                                    .map((record) => (
                                        <div key={record.idFicha} className='option' onClick={() => dropdown1.handleOptionClick(`${record.ficha} - ${record.nombre}`)}>
                                            {record.ficha} - {record.nombre}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div> */}
                </div>
        </>
    )
}

export default InformationBarAdminInstructor;