import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'

export const TableQuarter = () => {
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
                                <th>Fecha  de Finalización</th>
                                <th>Editar</th>
                                <th>Inhabilitar</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>20/01/2023</td>
                                    <td>29/04/2023</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20/01/2023</td>
                                    <td>29/04/2023</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20/01/2023</td>
                                    <td>29/04/2023</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>20/01/2023</td>
                                    <td>29/04/2023</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </div>

    </>
  )
}
