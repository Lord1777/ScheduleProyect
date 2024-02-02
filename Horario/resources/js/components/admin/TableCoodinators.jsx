import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCheck, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetCoordinator from "../../hooks/FetchGET/useFetchGetCoordinator";
import { Link } from 'react-router-dom';
import { useFetchPutCoordinator } from '../../hooks/FetchPUT/useFetchPutCoordinator';


export const TableCoodinators = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { dataCoordinator, fetchData} = useFetchGetCoordinator(disabled ? '/getDisableCoordinators' : '/getEnabledCoordinators', currentPage);
    const { fetchPutCoordinator } = useFetchPutCoordinator();

    let totalPage = dataCoordinator.last_page;

    const enableCoordinator = (idUsuario) => {
        fetchPutCoordinator('/enableCoordinator', idUsuario);
        fetchData();
    }

    const disableCoordinator = (idUsuario) =>{
        fetchPutCoordinator('/disableCoordinator', idUsuario);
        fetchData();
    }

    return (
        <>
            <h2 className='title'>Administrar Coordinadores {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
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
                    <Link><button type="button">Añadir Coordinador</button></Link>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dataCoordinator.data && dataCoordinator.data.length > 0 && dataCoordinator.data.map((coordinator) => {

                            return (
                                <tr>
                                    <td>{coordinator.documento}</td>
                                    <td>{coordinator.nombreCompleto}</td>
                                    <td>{coordinator.telefono}</td>
                                    <td>{coordinator.email}</td>
                                    <td>
                                        <Link to={`/UpdateCoordinador/${coordinator.idUsuario}`}>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit' />
                                        </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => {enableCoordinator(coordinator.idUsuario)}}>
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
