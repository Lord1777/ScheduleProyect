import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetRecord from '../../hooks/useFetchGetRecord';

export const TableRecords = () => {

    const { dataRecord, fetchDataRecord } = useFetchGetRecord();

    useEffect(() => {
        fetchDataRecord();
    }, [!dataRecord])


    return (
        <>
            <h2 className='title'>Administrar Fichas</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button type="button">Inhabilitados</button>
                    <button type="button">Añadir Ficha</button>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Ficha</th>
                            <th>Programa</th>
                            <th>Nivel de Formación</th>
                            <th>Jornada</th>
                            <th>Modalidad</th>
                            <th>Editar</th>
                            <th>Inhabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRecord.map((record) => {

                            return (
                                <tr>
                                    <td>{record.ficha}</td>
                                    <td>{record.idPrograma}</td>
                                    <td>nivel</td>
                                    <td>Jornada</td>
                                    <td>Modalidad</td>
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
