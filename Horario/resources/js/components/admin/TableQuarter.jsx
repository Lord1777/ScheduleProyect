import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetQuarter from '../../hooks/FetchGET/useFetchGetQuarter';
import { useFetchPutQuarter } from '../../hooks/FetchPUT/useFetchPutQuarter';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageQuarter } from '../../hooks/FetchPUT/useFetchPutManageQuarter';


export const TableQuarter = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [fecha, setFecha] = useState("")

    const { dataQuarter, fetchData, loading } = useFetchGetQuarter(
        disabled ? '/getDisableQuarters' : '/getEnabledQuarters',
        currentPage,
        fecha
    );

    let totalPage = dataQuarter.last_page;

    const { fetchManageQuarter } = useFetchPutManageQuarter();

    const enableQuarter = async (idTrimestre) => {
        await fetchManageQuarter('/enableQuarter', idTrimestre);
        fetchData();
    }
    const disableQuarter = async (idTrimestre) => {
        await fetchManageQuarter('/disableQuarter', idTrimestre);
        fetchData();
    }

    /* Buscador */

    const filteredTrimestre = dataQuarter && dataQuarter.data
        ? dataQuarter.data.filter((quarter) => {
            return (
                `${quarter.fechaInicio}`.toLowerCase().startsWith(fecha.toLowerCase())
            );
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, fecha]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h2 className='title'>Administrar Trimestres {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete='off'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button
                        type="button"
                        onClick={() => {
                            disabled ? setDisabled(false) : setDisabled(true);
                            setCurrentPage(1);
                        }}
                    >{disabled ? 'Habilitados' : 'Inhabilitados'}</button>
                    <Link to={'/AddTrimestre'} >
                        <button type="button">Añadir Trimestre</button>
                    </Link>

                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>N° Trimestre</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Finalización</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrimestre.map((quarter) => {
                            return (
                                <tr>
                                    <td>{quarter.trimestre}</td>
                                    <td>{quarter.fechaInicio}</td>
                                    <td>{quarter.fechaFinal}</td>
                                    <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                    <td>
                                        <Link to={`/UpdateTrimestre/${quarter.idTrimestre}`}>
                                            <button>
                                                <span class="material-symbols-outlined" id='iconCrud'>
                                                    edit
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableQuarter(quarter.idTrimestre)} >
                                                <span class="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                    check_circle
                                                </span>
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableQuarter(quarter.idTrimestre)} >
                                                <span class="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                    cancel
                                                </span>
                                            </button>
                                        </td>

                                    )}
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            <div className="container_pagination_buttons">
                <button
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo(0, 0);
                    }}
                    disabled={currentPage === 1}
                >Anterior</button>
                <button id='actuallyPage'>
                    {currentPage}
                </button>
                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo(0, 0);
                    }}
                    disabled={currentPage === totalPage}
                >Siguiente</button>
            </div>

        </>
    )
}
