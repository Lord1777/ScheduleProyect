import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCheck, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetCoordinator from "../../hooks/FetchGET/useFetchGetCoordinator";
import { Link } from 'react-router-dom';
import { useFetchPutCoordinator } from '../../hooks/FetchPUT/useFetchPutCoordinator';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageCoordinator } from '../../hooks/FetchPUT/useFetchPutManageCoordinator';


export const TableCoodinators = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [coordinador, setCoordinador] = useState('');

    const { dataCoordinator, fetchData, loading } = useFetchGetCoordinator(
        disabled ? '/getDisableCoordinators' : '/getEnabledCoordinators',
        currentPage,
        coordinador
    );

    const { fetchManageCoordinator } = useFetchPutManageCoordinator();

    let totalPage = dataCoordinator.last_page;

    const enableCoordinator = async(idUsuario) => {
        await fetchManageCoordinator('/enableCoordinator', idUsuario);
        fetchData();
    };

    const disableCoordinator = async(idUsuario) => {
        await fetchManageCoordinator('/disableCoordinator', idUsuario);
        fetchData();
    };

    const filteredCoordinators = dataCoordinator && dataCoordinator.data
        ? dataCoordinator.data.filter((coordinator) => {
            return (
                `${coordinator.documento}`.toLowerCase().startsWith(coordinador.toLowerCase()) ||
                coordinator.nombreCompleto.toLowerCase().startsWith(coordinador.toLowerCase())
            );
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, coordinador]);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <h2 className='title'>Administrar Coordinadores {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete='off'
                        value={coordinador}
                        onChange={(e) => setCoordinador(e.target.value)}
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
                    <Link to={'/AddCoordinador'} >
                        <button type="button">Añadir Coordinador</button>
                    </Link>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th className='align-left'>Nombre</th>
                            <th className='align-left'>Telefono</th>
                            <th className='align-left'>Email</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoordinators.map((coordinator) => (
                            <tr key={coordinator.idUsuario}>
                                <td>{coordinator.documento}</td>
                                <td className='align-left'>{coordinator.nombreCompleto}</td>
                                <td className='align-left'>{coordinator.telefono}</td>
                                <td className='align-left'>{coordinator.email}</td>
                                <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                <td>
                                    <Link to={`/UpdateCoordinador/${coordinator.idUsuario}`}>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit' />
                                        </button>
                                    </Link>
                                </td>
                                {disabled ? (
                                    <td>
                                        <button onClick={() => enableCoordinator(coordinator.idUsuario)}>
                                            <FontAwesomeIcon icon={faUserCheck} className='iconHabilitar' />
                                        </button>
                                    </td>
                                ) : (
                                    <td>
                                        <button onClick={() => disableCoordinator(coordinator.idUsuario)} >
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
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
