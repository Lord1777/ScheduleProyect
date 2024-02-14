import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageInstructor } from '../../hooks/FetchPUT/useFetchPutManageInstructor';
import useFetchGetInstructor from '../../hooks/FetchGET/useFetchGetInstructor';
import '../../../css/admin/TableInstructors.css';
import '../../../css/admin/SearchButtons.css'
import '../../../css/admin/Board.css'

export const TableInstructors = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [Instructor, setInstructor] = useState('');

    const { dataInstructor, fetchData, loading, setLoading } = useFetchGetInstructor(
        disabled ? '/getDisableInstructors' : '/getEnabledInstructors',
        currentPage,
        Instructor
        );
    const { fetchManageInstructor } = useFetchPutManageInstructor();

    let totalPage = dataInstructor.last_page;

    const enableInstructor = async(idUsuario) => {
        setLoading(true);
        await fetchManageInstructor('/enableInstructor', idUsuario);
        await fetchData();
        setLoading(false);
    }

    const disableInstructor = async(idUsuario) => {
        setLoading(true);
        await fetchManageInstructor('/disableInstructor', idUsuario);
        await fetchData();
        setLoading(false);
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

    if (loading) {
        return <Loading />
    }

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
                        onChange={(e) => setInstructor(e.target.value)} />
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
                            <th className='align-left'>Nombre</th>
                            <th className='align-left'>Email</th>
                            <th>Contrato</th>
                            <th className='align-left'>Profesión</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInstructor.map((instructor) => {

                            return (
                                <tr key={instructor.idUsuario}>
                                    <td>{instructor.documento}</td>
                                    <td className='align-left'>{instructor.nombreCompleto}</td>
                                    <td className='align-left'>{instructor.email}</td>
                                    <td>{instructor.tipoContrato}</td>
                                    <td className='align-left'>{instructor.profesion}</td>
                                    <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                    <td>
                                        <Link to={`/UpdateInstructor/${instructor.idUsuario}`}>
                                            <button>
                                                <span class="material-symbols-outlined" id='iconCrud'>
                                                    person_edit
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableInstructor(instructor.idUsuario)}>
                                                <span class="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                    person_check
                                                </span>
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableInstructor(instructor.idUsuario)}>
                                                <span class="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                    person_cancel
                                                </span>
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
