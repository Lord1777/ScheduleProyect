import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPenToSquare, faCircle } from '@fortawesome/free-solid-svg-icons';

export const TableEnvironments = () => {
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
                                <th>Tipo de Ambiente</th>
                                <th>Capacidad</th>
                                <th>Lugar de Ambiente</th>
                                <th>Editar</th>
                                <th>Inhabilitar</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>115</td>
                                    <td>Sistemas</td>
                                    <td>30</td>
                                    <td>CBI</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>115</td>
                                    <td>Sistemas</td>
                                    <td>30</td>
                                    <td>CBI</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>115</td>
                                    <td>Sistemas</td>
                                    <td>30</td>
                                    <td>CBI</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>115</td>
                                    <td>Sistemas</td>
                                    <td>30</td>
                                    <td>CBI</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faPenToSquare} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faCircle} className='iconInhabilitar' />
                                        </button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </div>
    </>
  )
}
