import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetCoordinator from "../../hooks/useFetchGetCoordinator";


export const TableCoodinators = () => {

    const { dataCoordinator, fetchDataCoordinator } = useFetchGetCoordinator();

    useEffect(() => {
        fetchDataCoordinator();
    }, [!dataCoordinator])


    return (
        <>
            <h2 className='title'>Administrar Coordinadores</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button type="button">Inhabilitados</button>
                    <button type="button">Añadir Coordinador</button>
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
                            <th>Inhabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCoordinator.map((coordinator) => {

                            return (
                                <tr>
                                    <td>{coordinator.documento}</td>
                                    <td>{coordinator.nombreCompleto}</td>
                                    <td>{coordinator.telefono}</td>
                                    <td>{coordinator.email}</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit' />
                                        </button>
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
