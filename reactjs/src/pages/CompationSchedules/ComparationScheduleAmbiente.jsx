import React, { useState, useEffect } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { useForm } from 'react-hook-form';
import useDropdown from '../../hooks/useDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import { useFetchGetScheduleEnvironment } from '../../hooks/FetchSchedule/useFetchGetScheduleEnvironment';
import { useFetchGetEnvironments } from '../../hooks/FetchGetResources/useFetchGetEnvironments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ScheduleComparation } from '../../components/Schedule/ScheduleComparation';
import { Loading } from '../../components/Loading/Loading';
import error from '../../assets/img/Advertencia.png'
import { ContinuoModal } from '../../components/Modals/ContinuoModal';

export const ComparationScheduleAmbiente = () => {

    const { register, setValue } = useForm();
    const dropdown1 = useDropdown(setValue, "Ambiente1");
    const dropdown2 = useDropdown(setValue, "trimestres1");
    const dropdown3 = useDropdown(setValue, "Ambiente2");
    const dropdown4 = useDropdown(setValue, "trimestres2");
    const dropdown5 = useDropdown(setValue, "Ambiente3");
    const dropdown6 = useDropdown(setValue, "trimestres3");
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { dataEnvironments } = useFetchGetEnvironments('/getEnvironments');
    const [searchAmbiente1, setSearchAmbiente1] = useState("");
    const [searchAmbiente2, setSearchAmbiente2] = useState("");
    const [searchAmbiente3, setSearchAmbiente3] = useState("");
    const [searchTrimestre1, setSearchTrimestre1] = useState("");
    const [searchTrimestre2, setSearchTrimestre2] = useState("");
    const [searchTrimestre3, setSearchTrimestre3] = useState("");
    const [ambiente1, setAmbiente1] = useState();
    const [ambiente2, setAmbiente2] = useState();
    const [ambiente3, setAmbiente3] = useState();
    const [trimestre1, setTrimestre1] = useState();
    const [trimestre2, setTrimestre2] = useState();
    const [trimestre3, setTrimestre3] = useState();
    // console.log(dataEnvironments)

    const handleOptionClickTrimestre1 = (trimestre) => {
        setTrimestre1(trimestre);
    }
    const handleAmbienteId1 = (id) => {
        setAmbiente1(id)
        console.log(` Ambiente1: ${id}`)
    }

    const handleOptionClickTrimestre2 = (trimestre) => {
        setTrimestre2(trimestre);
    }
    const handleAmbienteId2 = (id) => {
        setAmbiente2(id)
        console.log(` Ambiente2: ${id}`)
    }

    const handleOptionClickTrimestre3 = (trimestre) => {
        setTrimestre3(trimestre);
    }
    const handleAmbienteId3 = (id) => {
        setAmbiente3(id)
        console.log(`Ambiente: ${id}`)
    }

    useEffect(() => {

    }, [ambiente1, trimestre1, ambiente2, trimestre2, ambiente3, trimestre3]);

    const {
        dataSchedule: horarioAmbiente1,
        alertMessage: message1,
        openErrorModal: openErrorModal1,
        setOpenErrorModal: setOpenErrorModal1,
        loading: loading1
    } = useFetchGetScheduleEnvironment('/getScheduleEnvironment', ambiente1, trimestre1);

    const {
        dataSchedule: horarioAmbiente2,
        alertMessage: message2,
        openErrorModal: openErrorModal2,
        setOpenErrorModal: setOpenErrorModal2,
        loading: loading2
    } = useFetchGetScheduleEnvironment('/getScheduleEnvironment', ambiente2, trimestre2);

    const {
        dataSchedule: horarioAmbiente3,
        alertMessage: message3,
        openErrorModal: openErrorModal3,
        setOpenErrorModal: setOpenErrorModal3,
        loading: loading3
    } = useFetchGetScheduleEnvironment('/getScheduleEnvironment', ambiente3, trimestre3);

    if (loading1 || loading2 || loading3) {
        return <Loading />
    }

    return (
        <>
            <NavBar />
            {/* 1*/}
            <div className="container_comparation_schedules">
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ambiente'
                                placeholder='Ambiente'
                                readOnly
                                onClick={dropdown1.handleDropdown}
                                value={dropdown1.selectedOption}
                                autoComplete='off'
                                {...register("Ambiente1")}
                            />
                            <div className={`option-drop-comparation ${dropdown1.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchAmbiente1}
                                        onChange={(e) => setSearchAmbiente1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataEnvironments && dataEnvironments.length > 0 && dataEnvironments
                                        .filter((ambiente) =>
                                            String(ambiente.ambiente).toLowerCase().startsWith(searchAmbiente1.toLowerCase())
                                        )
                                        .map((ambiente) => (
                                            <div key={ambiente.idAmbiente}
                                                onClick={() => {
                                                    dropdown1.handleOptionClick(`${ambiente.ambiente}`)
                                                    handleAmbienteId1(`${ambiente.idAmbiente}`)
                                                }}
                                            >
                                                {ambiente.ambiente}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className={`desplegable-comparacion ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='trimestres'
                                placeholder='Trimestres'
                                readOnly
                                onClick={dropdown2.handleDropdown}
                                value={dropdown2.selectedOption}
                                {...register("trimestres1")}
                            />
                            <div className={`option-drop-comparation ${dropdown2.isDropdown ? 'open' : ''}`}>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchTrimestre1}
                                        onChange={(e) => setSearchTrimestre1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataQuarters && dataQuarters.length > 0 && dataQuarters
                                        .filter((quarter) =>
                                            `${quarter.trimestre}`.toLowerCase().startsWith(searchTrimestre1.toLowerCase()) ||
                                            `${quarter.fechaInicio}`.toLowerCase().startsWith(searchTrimestre1.toLowerCase())
                                        )
                                        .map((quarter) => (
                                            <div key={quarter.idTrimestre} onClick={() => {
                                                dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)
                                                handleOptionClickTrimestre1(`${quarter.trimestre}`);
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparation
                        funcionFecth={horarioAmbiente1}
                    />
                </div>

                {/* 2*/}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown3.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ambiente'
                                placeholder='Ambiente'
                                readOnly
                                onClick={dropdown3.handleDropdown}
                                value={dropdown3.selectedOption}
                                autoComplete='off'
                                {...register("Ambiente2")}
                            />
                            <div className={`option-drop-comparation ${dropdown3.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchAmbiente2}
                                        onChange={(e) => setSearchAmbiente2(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataEnvironments && dataEnvironments.length > 0 && dataEnvironments
                                        .filter((ambiente) =>
                                            String(ambiente.ambiente).toLowerCase().startsWith(searchAmbiente2.toLowerCase())
                                        )
                                        .map((ambiente) => (
                                            <div key={ambiente.idAmbiente}
                                                onClick={() => {
                                                    dropdown3.handleOptionClick(`${ambiente.ambiente}`)
                                                    handleAmbienteId2(`${ambiente.idAmbiente}`)
                                                }}
                                            >
                                                {ambiente.ambiente}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className={`desplegable-comparacion ${dropdown4.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='trimestres'
                                placeholder='Trimestres'
                                readOnly
                                onClick={dropdown4.handleDropdown}
                                value={dropdown4.selectedOption}
                                {...register("trimestres2")}
                            />
                            <div className={`option-drop-comparation ${dropdown4.isDropdown ? 'open' : ''}`}>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchTrimestre2}
                                        onChange={(e) => setSearchTrimestre2(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataQuarters && dataQuarters.length > 0 && dataQuarters
                                        .filter((quarter) =>
                                            `${quarter.trimestre}`.toLowerCase().startsWith(searchTrimestre2.toLowerCase()) ||
                                            `${quarter.fechaInicio}`.toLowerCase().startsWith(searchTrimestre2.toLowerCase())
                                        )
                                        .map((quarter) => (
                                            <div key={quarter.idTrimestre} onClick={() => {
                                                dropdown4.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                                handleOptionClickTrimestre2(`${quarter.trimestre}`);
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparation
                        funcionFecth={horarioAmbiente2}
                    />
                </div>
                {/* 3 */}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown5.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ambiente'
                                placeholder='Ambiente'
                                readOnly
                                onClick={dropdown5.handleDropdown}
                                value={dropdown5.selectedOption}
                                autoComplete='off'
                                {...register("Ambiente3")}
                            />
                            <div className={`option-drop-comparation ${dropdown5.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchAmbiente3}
                                        onChange={(e) => setSearchAmbiente3(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataEnvironments && dataEnvironments.length > 0 && dataEnvironments
                                        .filter((ambiente) =>
                                            String(ambiente.ambiente).toLowerCase().startsWith(searchAmbiente3.toLowerCase())
                                        )
                                        .map((ambiente) => (
                                            <div key={ambiente.idAmbiente}
                                                onClick={() => {
                                                    dropdown5.handleOptionClick(`${ambiente.ambiente}`)
                                                    handleAmbienteId3(`${ambiente.idAmbiente}`)
                                                }}
                                            >
                                                {ambiente.ambiente}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className={`desplegable-comparacion ${dropdown6.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='trimestres'
                                placeholder='Trimestres'
                                readOnly
                                onClick={dropdown6.handleDropdown}
                                value={dropdown6.selectedOption}
                                {...register("trimestres3")}
                            />
                            <div className={`option-drop-comparation ${dropdown6.isDropdown ? 'open' : ''}`}>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchTrimestre3}
                                        onChange={(e) => setSearchTrimestre3(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataQuarters && dataQuarters.length > 0 && dataQuarters
                                        .filter((quarter) =>
                                            `${quarter.trimestre}`.toLowerCase().startsWith(searchTrimestre3.toLowerCase()) ||
                                            `${quarter.fechaInicio}`.toLowerCase().startsWith(searchTrimestre3.toLowerCase())
                                        )
                                        .map((quarter) => (
                                            <div key={quarter.idTrimestre} onClick={() => {
                                                dropdown6.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                                handleOptionClickTrimestre3(`${quarter.trimestre}`);
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparation
                        funcionFecth={horarioAmbiente3}
                    />
                </div>


            </div>
            <ContinuoModal
                tittle="No encontrado"
                imagen={error}
                message={message1}
                open={openErrorModal1}
                close={() => setOpenErrorModal1(false)}
            />
            <ContinuoModal
                tittle="No encontrado"
                imagen={error}
                message={message2}
                open={openErrorModal2}
                close={() => setOpenErrorModal2(false)}
            />
            <ContinuoModal
                tittle="No encontrado"
                imagen={error}
                message={message3}
                open={openErrorModal3}
                close={() => setOpenErrorModal3(false)}
            />
        </>
    )
}
