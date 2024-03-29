import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageCoordinator } from '../../hooks/FetchPUT/useFetchPutManageCoordinator';
import useFetchGetCoordinator from "../../hooks/FetchGET/useFetchGetCoordinator";
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'


export const TableCoodinators = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [coordinador, setCoordinador] = useState('');
    


    const { dataCoordinator, fetchData, loading, setLoading, loadingPagination, setLoadingPagination } = useFetchGetCoordinator(
        disabled ? '/getDisableCoordinators' : '/getEnabledCoordinators',
        currentPage,
        coordinador
    );

    const { fetchManageCoordinator } = useFetchPutManageCoordinator();

    let totalPage = dataCoordinator.last_page;

    const enableCoordinator = async(idUsuario) => {
        setLoading(true);
        await fetchManageCoordinator('/enableCoordinator', idUsuario);
        await fetchData();
        setLoading(false);
    };

    const disableCoordinator = async(idUsuario) => {
        setLoading(true);
        await fetchManageCoordinator('/disableCoordinator', idUsuario);
        await fetchData();
        setLoading(false);
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

    if (loading){ 
        return <Loading />
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
                        placeholder="Buscar por documento o nombre"
                        autoComplete='off'
                        value={coordinador}
                        onChange={(e) => setCoordinador(e.target.value)}
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
                            <th className='align-left'>Ciudad</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoordinators.length === 0 || filteredCoordinators.size === 0 ? (
                                <tr className='notResult'>
                                    <td>No hay resultados</td>
                                </tr>                            
                        ) : (
                        filteredCoordinators.map((coordinator) => (
                            <tr key={coordinator.idUsuario}>
                                <td>{coordinator.documento}</td>
                                <td className='align-left'>{coordinator.nombreCompleto}</td>
                                <td className='align-left'>{coordinator.telefono}</td>
                                <td className='align-left'>{coordinator.email}</td>
                                <td className='align-left'>{coordinator.ciudad}</td>
                                <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                <td>
                                    <Link to={`/UpdateCoordinador/${coordinator.idUsuario}`}>
                                        <button>
                                            <span class="material-symbols-outlined" id='iconCrud'>
                                                person_edit
                                            </span>
                                        </button>
                                    </Link>
                                </td>
                                {disabled ? (
                                    <td>
                                        <button onClick={() => enableCoordinator(coordinator.idUsuario)}>
                                            <span class="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                person_check
                                            </span>
                                        </button>
                                    </td>
                                ) : (
                                    <td>
                                        <button onClick={() => disableCoordinator(coordinator.idUsuario)} >
                                            <span class="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                person_cancel
                                            </span>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )))}
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
