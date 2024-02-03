import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserAlt, faUserCheck, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import { useFetchPutInstructor } from '../../hooks/FetchPUT/useFetchPutInstructor';
import { Link } from 'react-router-dom';



export const TableInstructors = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [Instructor, setInstructor] = useState('');

    const { dataInstructor, fetchData } = useFetchGetInstructor(
        disabled ? '/getDisableInstructors' : '/getEnabledInstructors',
        currentPage,
        Instructor
        );
    const { fetchPutInstructor } = useFetchPutInstructor();

    let totalPage = dataInstructor.last_page;

    const enableInstructor = (idUsuario) => {
        fetchPutInstructor('/enableInstructor', idUsuario);
        fetchData();
    }

    const disableInstructor = (idUsuario) => {
        fetchPutInstructor('/disableInstructor', idUsuario);
        fetchData();
    }

    /*Buscador*/

    const filteredInstructor = dataInstructor && dataInstructor.data
        ? dataInstructor.data.filter((instructor) => {
            return (
                `${instructor.documento}`.toLowerCase().startsWith(Instructor.toLowerCase()) ||
                instructor.nombreCompleto.toLowerCase().startsWith(Instructor.toLowerCase())
            );
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, Instructor]);

    return (
        <>
            <h2 className='title'>Administrar Instructores {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder="Buscar" 
                    autoComplete='off'
                    value={Instructor}
                    onChange={(e) => setInstructor(e.target.value)}/>
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
                    <Link to={'/AddInstructor'}><button type="button">Añadir Instructor</button></Link>
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
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}


                        </tr>
                    </thead>
                    <tbody>
                        {filteredInstructor.map((instructor) => {

                            return (
                                <tr key={instructor.idUsuario}>
                                    <td>{instructor.documento}</td>
                                    <td>{instructor.nombreCompleto}</td>
                                    <td>{instructor.tipoContrato}</td>
                                    <td>{instructor.profesion}</td>
                                    <td>
                                        <Link to={`/UpdateInstructor/${instructor.idUsuario}`}>
                                            <button>
                                                <FontAwesomeIcon icon={faUserPen} className='iconEdit' />
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableInstructor(instructor.idUsuario)}>
                                                <FontAwesomeIcon icon={faUserCheck} className='iconHabilitar' />
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableInstructor(instructor.idUsuario)}>
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
    );
};
