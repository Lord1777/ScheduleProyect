import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import { Loading } from '../Loading/Loading';
import { getAñoByDate } from "../../hooks/useObjectFunction";
import useFetchGetSchedule from '../../hooks/FetchGET/useFetchGetSchedule';
import "../../../css/Schedule/ScheduleWatch.css";
import '../../../css/Cards/CardHorarios.css'
import gifNoResults from '../../assets/img/no_results.gif'
import useDropdown from "../../hooks/useDropdown";
import { useForm } from "react-hook-form";
import useFetchGetQuarters from "../../hooks/FetchGetResources/useFetchGetQuarters";

export const ScheduleWatch = () => {

    const [manage, setManage] = useState(false);

    const { register, setValue } = useForm();
    const dropdown2 = useDropdown(setValue, "trimestres");

    const { dataQuarters } = useFetchGetQuarters('/getQuarters');

    const { idHorario } = useParams();
    const { horarios, loading, setLoading, fetchData } = useFetchGetSchedule(manage ? '/getDisableScheduleRecord' : '/getScheduleRecord');
    const [searchFicha, setSearchFicha] = useState("");

    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    }

    const handleOptionClickTrimestre = async(selectedOption) => {
        if(selectedOption){
            setLoading(true);
            await fetchData(getQuarterId(selectedOption));
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    const filteredFicha = Array.isArray(horarios) ? horarios.filter(horario =>
        `${horario.ficha}`.toString().startsWith(searchFicha)
    ) : [];

    const setManageValue = () => {
        manage ? setManage(false) : setManage(true);
    }


    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}
            <div className="title-and-search">
                <h2>Horarios Académicos {manage ? 'inhabilitados' : 'habilitados'}</h2>
                <div className="search-input">
                    <div className="contain-buttons">
                        {
                            manage ?
                                <button onClick={setManageValue} >Habilitados</button>
                                :
                                <button onClick={setManageValue} >Inhabilitados</button>
                        }
                    </div>

                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete="off"
                        value={searchFicha}
                        onChange={(e) => setSearchFicha(e.target.value)}
                    />
                    <div className="content-icon-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                </div>

                <div className={`desplegable-trimestre-instructor ${dropdown2.isDropdown ? 'open' : ''}`}>
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
            </div>{/*Titulo y buscador*/}

            <div className="contenedor">

                {filteredFicha.length === 0 || filteredFicha.size === 0 ? (
                    <>
                        <div className="no-results">
                            <p>No se encontraron resultados.</p>
                            <img src={gifNoResults} alt="gif" />
                        </div>

                    </>
                ) : (
                    filteredFicha.map((horario) => (
                        <Link key={horario.idHorario} to={`/HorarioAdminAprendiz/${horario.idFicha}/${horario.idHorario}/${manage}`}>
                            <div className="card" >
                                <span className="material-symbols-outlined icon">
                                    calendar_month
                                </span>
                                <div className="text-car">
                                    <h2>Ficha</h2>
                                    <span>{horario.ficha}</span>
                                    <span>Trimestre {horario.trimestre}</span>
                                    <span>Año {getAñoByDate(horario.fechaInicio)}</span>
                                </div>
                            </div>
                        </Link>
                    )))}

            </div>
        </>
    );
};

export default ScheduleWatch;
