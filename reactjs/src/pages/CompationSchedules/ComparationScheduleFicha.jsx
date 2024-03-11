import React, { useState, useEffect } from 'react'
import '../../../css/Schedule/ComparationsSchedule.css'
import error from '../../assets/img/Advertencia.png'
import { NavBar } from '../../components/NavBar/NavBar'
import { useForm } from 'react-hook-form';
import useDropdown from '../../hooks/useDropdown';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import { useFetchGetRecords } from '../../hooks/FetchGetResources/useFetchGetRecords';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScheduleComparation } from '../../components/Schedule/ScheduleComparation';
import useFetchGetComparationHorarioFicha from '../../hooks/FetchSchedule/useFetchGetComparationHorarioFicha';
import { Loading } from '../../components/Loading/Loading';
import { ContinuoModal } from '../../components/Modals/ContinuoModal';


export const ComparationScheduleFicha = () => {

    const { register, setValue } = useForm();
    const dropdown1 = useDropdown(setValue, "Ficha1");
    const dropdown2 = useDropdown(setValue, "trimestres1");
    const dropdown3 = useDropdown(setValue, "Ficha2");
    const dropdown4 = useDropdown(setValue, "trimestres2");
    const dropdown5 = useDropdown(setValue, "Ficha3");
    const dropdown6 = useDropdown(setValue, "trimestres3");
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { dataRecords } = useFetchGetRecords('/getRecords');
    const [searchFicha1, setSearchFicha1] = useState("");
    const [searchFicha2, setSearchFicha2] = useState("");
    const [searchFicha3, setSearchFicha3] = useState("");
    const [searchTrimestre1, setSearchTrimestre1] = useState("");
    const [searchTrimestre2, setSearchTrimestre2] = useState("");
    const [searchTrimestre3, setSearchTrimestre3] = useState("");
    const [ficha1, setFicha1] = useState();
    const [ficha2, setFicha2] = useState();
    const [ficha3, setFicha3] = useState();
    const [trimestre1, setTrimestre1] = useState();
    const [trimestre2, setTrimestre2] = useState();
    const [trimestre3, setTrimestre3] = useState();

    const handleOptionClickTrimestre1 = (trimestre) => {
        setTrimestre1(trimestre);
        console.log(` trimestre1: ${trimestre}`)
    }
    const handleFichaId1 = (id) => {
        setFicha1(id)
        console.log(` Ficha1: ${id}`)
    }

    const handleOptionClickTrimestre2 = (trimestre) => {
        setTrimestre2(trimestre);
    }
    const handleFichaId2 = (id) => {
        setFicha2(id)
        console.log(` Ficha2: ${id}`)
    }

    const handleOptionClickTrimestre3 = (trimestre) => {
        setTrimestre3(trimestre);
    }
    const handleFichaId3 = (id) => {
        setFicha3(id)
        console.log(`Ficha3: ${id}`)
    }

    useEffect(() => {

    }, [ficha1, trimestre1, ficha2, trimestre2, ficha3, trimestre3]);

    const {
        dataSchedule: horarioFicha1,
        alertMessage: message1,
        openErrorModal: openErrorModal1,
        setOpenErrorModal: setOpenErrorModal1,
        loading: loading1
    } = useFetchGetComparationHorarioFicha('/getHorarioComparationFicha', ficha1, trimestre1);
    console.log(horarioFicha1)

    const {
        dataSchedule: horarioFicha2,
        alertMessage: message2,
        openErrorModal: openErrorModal2,
        setOpenErrorModal: setOpenErrorModal2,
        loading: loading2
    } = useFetchGetComparationHorarioFicha('/getHorarioComparationFicha', ficha2, trimestre2);

    const {
        dataSchedule: horarioFicha3,
        alertMessage: message3,
        openErrorModal: openErrorModal3,
        setOpenErrorModal: setOpenErrorModal3,
        loading: loading3
    } = useFetchGetComparationHorarioFicha('/getHorarioComparationFicha', ficha3, trimestre3);

    if(loading1 || loading2 || loading3){
        return <Loading/>
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
                                name='Ficha'
                                placeholder='Ficha'
                                readOnly
                                onClick={dropdown1.handleDropdown}
                                value={dropdown1.selectedOption}
                                autoComplete='off'
                                {...register("Ficha1")}
                            />
                            <div className={`option-drop-comparation ${dropdown1.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchFicha1}
                                        onChange={(e) => setSearchFicha1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataRecords && dataRecords.length > 0 && dataRecords
                                        .filter((ficha) =>
                                            `${ficha.nombre}`.toLowerCase().startsWith(searchFicha1.toLowerCase()) ||
                                            `${ficha.ficha}`.toLowerCase().startsWith(searchFicha1.toLowerCase())
                                        )
                                        .map((ficha) => (
                                            <div key={ficha.idFicha}
                                                onClick={() => {
                                                    dropdown1.handleOptionClick(`${ficha.ficha} - ${ficha.nombre}`)
                                                    handleFichaId1(`${ficha.idFicha}`)
                                                }}
                                            >
                                                {(`${ficha.ficha} - ${ficha.nombre}`)}
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
                        funcionFecth={horarioFicha1}
                    />
                </div>

                {/* 2*/}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown3.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ficha'
                                placeholder='Ficha'
                                readOnly
                                onClick={dropdown3.handleDropdown}
                                value={dropdown3.selectedOption}
                                autoComplete='off'
                                {...register("Ficha2")}
                            />
                            <div className={`option-drop-comparation ${dropdown3.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchFicha2}
                                        onChange={(e) => setSearchFicha2(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataRecords && dataRecords.length > 0 && dataRecords
                                        .filter((ficha) =>
                                            `${ficha.nombre}`.toLowerCase().startsWith(searchFicha2.toLowerCase()) ||
                                            `${ficha.ficha}`.toLowerCase().startsWith(searchFicha2.toLowerCase())
                                        )
                                        .map((ficha) => (
                                            <div key={ficha.idFicha}
                                                onClick={() => {
                                                    dropdown3.handleOptionClick(`${ficha.ficha} - ${ficha.nombre}`)
                                                    handleFichaId2(`${ficha.idFicha}`)
                                                }}
                                            >
                                                {(`${ficha.ficha} - ${ficha.nombre}`)}
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
                        funcionFecth={horarioFicha2}
                    />
                </div>
                {/* 3 */}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown5.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ficha'
                                placeholder='Ficha'
                                readOnly
                                onClick={dropdown5.handleDropdown}
                                value={dropdown5.selectedOption}
                                autoComplete='off'
                                {...register("Ficha3")}
                            />
                            <div className={`option-drop-comparation ${dropdown5.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchFicha3}
                                        onChange={(e) => setSearchFicha3(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataRecords && dataRecords.length > 0 && dataRecords
                                        .filter((ficha) =>
                                            `${ficha.nombre}`.toLowerCase().startsWith(searchFicha3.toLowerCase()) ||
                                            `${ficha.ficha}`.toLowerCase().startsWith(searchFicha3.toLowerCase())
                                        )
                                        .map((ficha) => (
                                            <div key={ficha.idFicha}
                                                onClick={() => {
                                                    dropdown5.handleOptionClick(`${ficha.ficha} - ${ficha.nombre}`)
                                                    handleFichaId3(`${ficha.idFicha}`)
                                                }}
                                            >
                                                {(`${ficha.ficha} - ${ficha.nombre}`)}
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
                        funcionFecth={horarioFicha3}
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
