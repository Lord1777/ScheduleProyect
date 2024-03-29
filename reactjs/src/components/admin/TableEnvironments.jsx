import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageEnvironment } from '../../hooks/FetchPUT/useFetchPutManageEnvironment';
import useFetchGetEnvironment from '../../hooks/FetchGET/useFetchGetEnvironment';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'


export const TableEnvironments = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ambiente, setAmbiente] = useState("")

    const { dataEnvironment, fetchData, loading, setLoading } = useFetchGetEnvironment(
        disabled ? '/getDisableEnvironments' : '/getEnabledEnvironments',
        currentPage,
        ambiente
    );
    const { fetchManageEnvironment } = useFetchPutManageEnvironment();

    let totalPage = dataEnvironment.last_page;

    const enableEnvironment = async (idAmbiente) => {
        setLoading(true);
        await fetchManageEnvironment('/enableEnvironment', idAmbiente);
        await fetchData();
        setLoading(false);
    }

    const disableEnvironment = async (idAmbiente) => {
        setLoading(true);
        await fetchManageEnvironment('/disableEnvironment', idAmbiente);
        await fetchData();
        setLoading(false);
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
                        placeholder="Buscar por ambiente"
                        autoComplete='off'
                        value={ambiente}
                        onChange={(e) => setAmbiente(e.target.value)}
                    />
                    <div className="content-icon-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
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
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAmbiente.length === 0 || filteredAmbiente.size === 0 ? (
                            <tr className='notResult'>
                                <td>No hay resultados</td>
                            </tr>
                        ) : (
                            filteredAmbiente.map((environment) => {

                                return (
                                    <tr>
                                        <td>{environment.ambiente}</td>
                                        <td>{environment.capacidad}</td>
                                        <td>{environment.sede}</td>
                                        <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                        <td>
                                            <Link to={`/UpdateAmbiente/${environment.idAmbiente}`}>
                                                <button className='editar'>
                                                    <span class="material-symbols-outlined" id='iconCrud'>
                                                        edit
                                                    </span>
                                                </button>
                                            </Link>
                                        </td>
                                        {disabled ? (
                                            <td>
                                                <button onClick={() => enableEnvironment(environment.idAmbiente)} >
                                                    <span class="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                        check_circle
                                                    </span>
                                                </button>
                                            </td>
                                        ) : (
                                            <td>
                                                <button onClick={() => disableEnvironment(environment.idAmbiente)}>
                                                    <span class="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                        cancel
                                                    </span>
                                                </button>
                                            </td>

                                        )}
                                    </tr>
                                )
                            }))}
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
