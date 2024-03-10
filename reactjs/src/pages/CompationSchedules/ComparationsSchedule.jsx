import React, { useState, useEffect } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { ScheduleComparation } from '../../components/Schedule/ScheduleComparation'
import '../../../css/Schedule/ComparationsSchedule.css'
import useDropdown from '../../hooks/useDropdown'
import { useForm } from 'react-hook-form'
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters'
import { useFetchGetInstructors } from '../../hooks/FetchGetResources/useFetchGetInstructors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useFetchGetScheduleAdminInstructor } from '../../hooks/FetchSchedule/useFetchGetScheduleAdminInstructor'
import { ContinuoModal } from '../../components/Modals/ContinuoModal'
import error from '../../assets/img/Advertencia.png'
import { Loading } from '../../components/Loading/Loading'

export const ComparationsSchedule = () => {

    const { register, setValue } = useForm();
    const dropdown1 = useDropdown(setValue, "instructor1");
    const dropdown2 = useDropdown(setValue, "trimestres1");
    const dropdown3 = useDropdown(setValue, "instructor2");
    const dropdown4 = useDropdown(setValue, "trimestres2");
    const dropdown5 = useDropdown(setValue, "instructor3");
    const dropdown6 = useDropdown(setValue, "trimestres3");
    const { dataInstructors } = useFetchGetInstructors('/getInstructors');
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const [searchInstructor1, setSearchInstructor1] = useState("");
    const [searchTrimestre1, setSearchTrimestre1] = useState("");
    const [ instructor1, setInstructor1 ] = useState();
    const [ instructor2, setInstructor2 ] = useState();
    const [ instructor3, setInstructor3 ] = useState();
    const [ trimestre1, setTrimestre1 ] = useState();
    const [ trimestre2, setTrimestre2] = useState();
    const [ trimestre3, setTrimestre3 ] = useState();
    
    const handleOptionClickTrimestre1 = (trimestre) => {
        setTrimestre1(trimestre);
    }
    const handleInstruuctorId1 = (id) => {
        setInstructor1(id);
    }

    const handleOptionClickTrimestre2 = (trimestre) => {
        setTrimestre2(trimestre);
    }
    const handleInstruuctorId2 = (id) => {
        setInstructor2(id);
    }

    const handleOptionClickTrimestre3 = (trimestre) => {
        setTrimestre3(trimestre);
    }
    const handleInstruuctorId3 = (id) => {
        setInstructor3(id);
    }

    useEffect(() => {

    }, [ instructor1, trimestre1, instructor2, trimestre2, instructor3, trimestre3]);

    const { dataSchedule: horarioInstuctor1, alertMessage: message1, openErrorModal: openErrorModal1, setOpenErrorModal: setOpenErrorModal1, loading: loading1 } = useFetchGetScheduleAdminInstructor(
        '/getAdminScheduleInstructor',
        instructor1,
        trimestre1
    );

    const { dataSchedule: horarioInstuctor2, alertMessage: message2, openErrorModal: openErrorModal2, setOpenErrorModal: setOpenErrorModal2, loading: loading2 } = useFetchGetScheduleAdminInstructor(
        '/getAdminScheduleInstructor',
        instructor2,
        trimestre2
    );

    const { dataSchedule: horarioInstuctor3, alertMessage: message3, openErrorModal: openErrorModal3, setOpenErrorModal: setOpenErrorModal3, loading: loading3 } = useFetchGetScheduleAdminInstructor(
        '/getAdminScheduleInstructor',
        instructor3,
        trimestre3
    );

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
                                name='Instructores'
                                placeholder='Instructor'
                                readOnly
                                onClick={dropdown1.handleDropdown}
                                value={dropdown1.selectedOption}
                                autoComplete='off'
                                {...register("instructor1")}
                            />
                            <div className={`option-drop-comparation ${dropdown1.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchInstructor1}
                                        onChange={(e) => setSearchInstructor1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataInstructors && dataInstructors.length > 0 && dataInstructors
                                        .filter((instructor) =>
                                            instructor.nombreCompleto.toLowerCase().startsWith(searchInstructor1.toLowerCase())
                                        )
                                        .map((instructor) => (
                                            <div key={instructor.idUsuario}
                                                onClick={() => {
                                                    dropdown1.handleOptionClick(`${instructor.nombreCompleto}`)
                                                    handleInstruuctorId1(`${instructor.idUsuario}`)
                                                }}
                                            >
                                                {instructor.nombreCompleto}
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
                        funcionFecth={horarioInstuctor1}
                    />
                </div>

                {/* 2*/}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown3.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Instructores'
                                placeholder='Instructor'
                                readOnly
                                onClick={dropdown3.handleDropdown}
                                value={dropdown3.selectedOption}
                                autoComplete='off'
                                {...register("instructor2")}
                            />
                            <div className={`option-drop-comparation ${dropdown3.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchInstructor1}
                                        onChange={(e) => setSearchInstructor1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataInstructors && dataInstructors.length > 0 && dataInstructors
                                        .filter((instructor) =>
                                            instructor.nombreCompleto.toLowerCase().startsWith(searchInstructor1.toLowerCase())
                                        )
                                        .map((instructor) => (
                                            <div key={instructor.idUsuario}
                                                onClick={() => {
                                                    dropdown3.handleOptionClick(`${instructor.nombreCompleto}`)
                                                    handleInstruuctorId2(`${instructor.idUsuario}`)
                                                }}
                                            >
                                                {instructor.nombreCompleto}
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
                    funcionFecth={horarioInstuctor2}
                    />
                </div>
                {/* 3 */}
                <div className="container-horario-desplegables">
                    <div className="contenedor-de-dropdowns">

                        <div className={`desplegable-comparacion ${dropdown5.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Instructores'
                                placeholder='Instructor'
                                readOnly
                                onClick={dropdown5.handleDropdown}
                                value={dropdown5.selectedOption}
                                autoComplete='off'
                                {...register("instructor3")}
                            />
                            <div className={`option-drop-comparation ${dropdown5.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar-comparation">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchInstructor1}
                                        onChange={(e) => setSearchInstructor1(e.target.value)}
                                    />
                                    <div className="icon-search-comparation">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options-comparacion">
                                    {dataInstructors && dataInstructors.length > 0 && dataInstructors
                                        .filter((instructor) =>
                                            instructor.nombreCompleto.toLowerCase().startsWith(searchInstructor1.toLowerCase())
                                        )
                                        .map((instructor) => (
                                            <div key={instructor.idUsuario}
                                                onClick={() =>{
                                                    dropdown5.handleOptionClick(`${instructor.nombreCompleto}`)
                                                    handleInstruuctorId3(`${instructor.idUsuario}`)
                                                }}
                                            >
                                                {instructor.nombreCompleto}
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
                    funcionFecth={horarioInstuctor3}/>
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
