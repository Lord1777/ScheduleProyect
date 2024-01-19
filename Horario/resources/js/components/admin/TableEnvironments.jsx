import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetEnvironment from '../../hooks/FetchGET/useFetchGetEnvironment';
import { useFetchPutEnvironment } from '../../hooks/FetchPUT/useFetchPutEnvironment';


export const TableEnvironments = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { dataEnvironment, fetchData} = useFetchGetEnvironment(disabled ? '/getDisableEnvironments' : '/getEnabledEnvironments', currentPage);  
    const { fetchPutEnvironment } = useFetchPutEnvironment()

    let totalPage = dataEnvironment.last_page;

    const enableEnvironment = (idAmbiente) => {
        fetchPutEnvironment('/enableEnvironment', idAmbiente);
        fetchData();
    }

    const disableEnvironment = (idAmbiente) =>{
        fetchPutEnvironment('/disableEnvironment', idAmbiente);
        fetchData();
    }

    return (
        <>
            <h2 className='title'>Administrar Ambientes</h2>
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
                    <button type="button">Añadir Ambiente</button>
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
                        {dataEnvironment.data && dataEnvironment.data.length > 0 && dataEnvironment.data.map((environment) => {

                            return (
                                <tr>
                                    <td>{environment.ambiente}</td>
                                    <td>{environment.capacidad}</td>
                                    <td>{environment.sede}</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit' />
                                        </button>
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
