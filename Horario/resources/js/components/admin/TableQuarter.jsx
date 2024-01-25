import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle, faUserCheck, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetQuarter from '../../hooks/FetchGET/useFetchGetQuarter';
import { useFetchPutQuarter } from '../../hooks/FetchPUT/useFetchPutQuarter';


export const TableQuarter = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { dataQuarter, fetchData } = useFetchGetQuarter(disabled ? '/getDisableQuarters' : '/getEnabledQuarters', currentPage);
    const { fetchPutQuarter} = useFetchPutQuarter();

    console.log(dataQuarter);

    let totalPage = dataQuarter.last_page;

    const enableQuarter = (idTrimestre) => {
        fetchPutQuarter('/enableQuarter', idTrimestre);
        fetchData();
    }

    const disableQuarter = (idTrimestre) =>{
        fetchPutQuarter('/disableQuarter', idTrimestre);
        fetchData();
    }

    return (
        <>
            <h2 className='title'>Administrar Trimestres</h2>
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
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dataQuarter.data && dataQuarter.data.length > 0 && dataQuarter.data.map((quarter) => {
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
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableQuarter(quarter.idTrimestre)} >
                                                <FontAwesomeIcon icon={faUserSlash} className='iconHabilitar' />
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableQuarter(quarter.idTrimestre)} >
                                                <FontAwesomeIcon icon={faUserCheck} className='iconInhabilitar' />
                                            </button>
                                        </td>

                                    )}
                                </tr>
                            )
                        })
                        }
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
