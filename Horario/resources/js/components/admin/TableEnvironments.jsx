import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetEnvironment from '../../hooks/useFetchGetEnvironment';

export const TableEnvironments = () => {

    const { dataEnvironment, fetchDataEnvironment } = useFetchGetEnvironment();

    useEffect(() =>{
        fetchDataEnvironment()
    }, [!dataEnvironment])

    return (
        <>
            <h2 className='title'>Administrar Ambientes</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button type="button">Inhabilitados</button>
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
                            <th>Inhabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataEnvironment.map((environment) => {

                            return (
                                <tr>
                                    <td>{environment.ambiente}</td>
                                    <td>{environment.capacidad}</td>
                                    <td>{environment.idSede}</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit' />
                                        </button>
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar' />
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
