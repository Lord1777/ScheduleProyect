import React, { useState } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import '../../../css/Cards/CardHorarios.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import useFetchGetSchedule from '../../hooks/FetchGET/useFetchGetSchedule';
import { Loading } from '../Loading/Loading';
import { getAñoByDate } from "../../hooks/useObjectFunction";

export const ScheduleWatch = () => {

    const [manage, setManage] = useState(false);

    const { idHorario } = useParams();
    const { horarios, loading, setLoading, fetchData } = useFetchGetSchedule( manage ? '/getScheduleRecord' : '/getDisableScheduleRecord');
    const [searchFicha, setSearchFicha] = useState("");

    if (loading) {
        return <Loading />
    }

    const filteredFicha = Array.isArray(horarios) ? horarios.filter(horario =>
        `${horario.ficha}`.toString().startsWith(searchFicha)
    ) : [];

    const setManageValue = () =>{
        manage ? setManage(false) : setManage(true);
    }


    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}
            <div className="title-and-search">
                <h2>Horarios Académicos {manage ? 'inhabilitados' : 'habilitados'}</h2>
                <div className="search-input">
                {
                    manage ? 
                    <button onClick={setManageValue} >habilitados</button>
                    : 
                    <button onClick={setManageValue} >inhabilitados</button>
                }
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete="off"
                        value={searchFicha}
                        onChange={(e) => setSearchFicha(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                    />
                </div>
            </div>{/*Titulo y buscador*/}

            <div className="contenedor">

                {filteredFicha.length === 0 ? (
                    <p>No se encontraron resultados.</p>
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

            {/* <div className="Space"></div> */}
        </>
    );
};

export default ScheduleWatch;
