import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetEnvironment from '../../hooks/FetchGET/useFetchGetEnvironment';
import { useFetchPutEnvironment } from '../../hooks/FetchPUT/useFetchPutEnvironment';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageEnvironment } from '../../hooks/FetchPUT/useFetchPutManageEnvironment';


export const TableEnvironments = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ambiente, setAmbiente] = useState("")

    const { dataEnvironment, fetchData, loading } = useFetchGetEnvironment(
        disabled ? '/getDisableEnvironments' : '/getEnabledEnvironments',
        currentPage,
        ambiente
    );
    const { fetchManageEnvironment } = useFetchPutManageEnvironment();

    let totalPage = dataEnvironment.last_page;

    const enableEnvironment = async (idAmbiente) => {
        await fetchManageEnvironment('/enableEnvironment', idAmbiente);
        fetchData();
    }

    const disableEnvironment = async (idAmbiente) => {
        await fetchManageEnvironment('/disableEnvironment', idAmbiente);
        fetchData();
    }

    /*Buscador*/

    const filteredAmbiente = dataEnvironment && dataEnvironment.data
        ? dataEnvironment.data.filter((environment) => {
            return (
                `${environment.ambiente}`.toLowerCase().startsWith(ambiente.toLowerCase())
            );
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, ambiente]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h2 className='title'>Administrar Ambientes {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete='off'
                        value={ambiente}
                        onChange={(e) => setAmbiente(e.target.value)}
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
                    <Link to={'/AddAmbiente'} >
                        <button type="button">Añadir Ambiente</button>
                    </Link>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Ambiente</th>
                            <th>Capacidad</th>
                            <th>Lugar de Ambiente</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAmbiente.map((environment) => {

                            return (
                                <tr>
                                    <td>{environment.ambiente}</td>
                                    <td>{environment.capacidad}</td>
                                    <td>{environment.sede}</td>
                                    <td>
                                        <Link to={`/UpdateAmbiente/${environment.idAmbiente}`}>
                                            <button className='editar'>
                                                <FontAwesomeIcon icon={faPenToSquare} className='iconEdit' />
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableEnvironment(environment.idAmbiente)} >
                                                <FontAwesomeIcon icon={faUserCheck} className='iconHabilitar' />
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableEnvironment(environment.idAmbiente)}>
                                                <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar' />
                                            </button>
                                        </td>

                                    )}
                                </tr>
                            )
                        })}
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
