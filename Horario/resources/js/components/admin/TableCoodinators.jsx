import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'

export const TableCoodinators = () => {
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
                                <tr>
                                    <td>101583409</td>
                                    <td>Andrea Potes Perez</td>
                                    <td>3127393809</td>
                                    <td>andreapotes24@soy.sena.com</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>102854659</td>
                                    <td>Jorge Olivares</td>
                                    <td>3127873809</td>
                                    <td>TheOlivares17@soy.sena.com</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1518253748</td>
                                    <td>Brayan</td>
                                    <td>3120093809</td>
                                    <td>b4yans07@soy.sena.com</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>103983401</td>
                                    <td>Aldemar Bermudez</td>
                                    <td>3108568843</td>
                                    <td>elaldobermudez19@soy.sena.com</td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserPen} className='iconEdit'/>
                                        </button>  
                                    </td>
                                    <td>
                                        <button>
                                            <FontAwesomeIcon icon={faUserSlash} className='iconInhabilitar'/>
                                        </button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
            </div>
    </>
  )
}
