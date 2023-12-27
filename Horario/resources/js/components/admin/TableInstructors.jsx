import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';


export const TableInstructors = () => {

    const { dataInstructor, fetchDataInstructor } = useFetchGetInstructor();

    useEffect(() => {
        fetchDataInstructor();
    }, [!dataInstructor]);


    return (
        <>
            <h2 className='title'>Administrar Instructores</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button type="button">Inhabilitados</button>
                    <button type="button">Añadir Instructor</button>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Contrato</th>
                            <th>Profesión</th>
                            <th>Editar</th>
                            <th>Inhabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataInstructor.map((instructor) => {

                            return (
                                <tr>
                                    <td>{instructor.documento}</td>
                                    <td>{instructor.nombreCompleto}</td>
                                    <td>{instructor.tipoContrato}</td>
                                    <td>{instructor.profesion}</td>
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
    );
};
