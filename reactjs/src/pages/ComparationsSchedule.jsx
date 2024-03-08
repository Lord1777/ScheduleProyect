import React, { useState } from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { ScheduleComparationInstructor } from '../components/Schedule/ScheduleComparationInstructor'
import '../../css/Schedule/ComparationsSchedule.css'
import useDropdown from '../hooks/useDropdown'
import { useForm } from 'react-hook-form'
import useFetchGetQuarters from '../hooks/FetchGetResources/useFetchGetQuarters'
import { useFetchGetInstructors } from '../hooks/FetchGetResources/useFetchGetInstructors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
                                                onClick={() => dropdown1.handleOptionClick(`${instructor.nombreCompleto}`)}
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
                                                dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparationInstructor />
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
                                                onClick={() => dropdown3.handleOptionClick(`${instructor.nombreCompleto}`)}
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
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparationInstructor />
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
                                                onClick={() => dropdown5.handleOptionClick(`${instructor.nombreCompleto}`)}
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
                                            }}>
                                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>

                    </div>
                    <ScheduleComparationInstructor />
                </div>


            </div>
        </>
    )
}
