import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../../css/admin/Board.css';
import '../../../css/admin/SearchButtons.css';
import '../../../css/admin/TableInstructors.css';
import useFetchGetRecord from '../../hooks/FetchGET/useFetchGetRecord';

export const TableRecords = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { dataRecord } = useFetchGetRecord(disabled ? '/getDisableRecords' : '/getEnabledRecords', currentPage);

    let totalPage = dataRecord.last_page;

    return (
        <>
            <h2 className='title'>Administrar Fichas {disabled ? 'Inhabilitadas' : 'Habilitadas'}</h2>
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
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRecord.data && dataRecord.data.length > 0 && dataRecord.data.map((record) => {

                            return (
                                <tr key={record.id}>
                                    <td>{record.ficha}</td>
                                    <td>{record.nombre}</td>
                                    <td>{record.nivel}</td>
                                    <td>{record.jornada}</td>
                                    <td>{record.modalidad}</td>
                                    <td>
                                        <Link to={`/UpdateFicha/${record.idFicha}`}>
                                            <button>
                                                <FontAwesomeIcon icon={faPenToSquare} className='iconEdit' />
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td key={`habilitar-${record.id}`}>
                                            <button>
                                                <FontAwesomeIcon icon={faUserCheck} className='iconHabilitar' />
                                            </button>
                                        </td>
                                    ) : (
                                        <td key={`inhabilitar-${record.id}`}>
                                            <button>
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
