import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetQuarter from '../../hooks/useFetchGetQuarter';


export const TableQuarter = () => {

    const { dataQuarter, fetchDataQuarter } = useFetchGetQuarter();

    useEffect(() => {
        fetchDataQuarter();
    }, [!dataQuarter])

    return (
        <>
            <h2 className='title'>Administrar Trimestres</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input type="search" name="search" id="search" placeholder="Buscar" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>

                <div className="buttons">
                    <button type="button">Inhabilitados</button>
                    <button type="button">Añadir Trimestre</button>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>N° Trimestre</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Finalización</th>
                            <th>Editar</th>
                            <th>Inhabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataQuarter.map((quarter) => {

                                return (
                                    <tr>
                                        <td>{quarter.trimestre}</td>
                                        <td>{quarter.fechaInicio}</td>
                                        <td>{quarter.fechaFinal}</td>
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
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}
