import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useFetchPutManageProgram } from '../../hooks/FetchPUT/useFetchPutManageProgram';
import useFetchGetProgram from '../../hooks/FetchGET/useFetchGetProgram'


export const TablePrograms = () => {
    
    const [disableLoading, setDisableLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [programa, setPrograma] = useState("");

    const { dataProgram, loading, fetchData, setLoading } = useFetchGetProgram(
        disabled ? '/getDisableProgram' : '/getEnableProgram',
        currentPage,
        programa
    );

    const { fetchManageProgram } = useFetchPutManageProgram();

    let totalPage = dataProgram.last_page;

    const enableProgram = async(idPrograma) => {
        setLoading(true);
        await fetchManageProgram('/enableProgram', idPrograma)
        await fetchData();
        setLoading(false);
    }

    const disableProgram = async(idPrograma) => {
        setLoading(true);
        await fetchManageProgram('/disableProgram', idPrograma);
        await fetchData();
        setLoading(false);
    }

    const filteredPrograma = dataProgram && dataProgram.data
        ? dataProgram.data.filter((program) => {
            return (
                program.nombre.toLowerCase().startsWith(programa.toLowerCase())
            )
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, programa]);


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h2 className='title'>Administrar Programas {disabled ? 'Inhabilitados' : 'Habilitados'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar por programa"
                        autoComplete='off'
                        value={programa}
                        onChange={(e) => setPrograma(e.target.value)}
                    />
                    <div className="content-icon-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                </div>

                <div className="buttons">
                    <button
                        type="button"
                        onClick={() => {
                            disabled ? setDisabled(false) : setDisabled(true);
                            setCurrentPage(1);
                        }}
                    >{disabled ? 'Habilitados' : 'Inhabilitados'}</button>
                    <Link to={'/AddPrograma'}><button type="button">Añadir Programa</button></Link>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th className='align-left'>Nombre</th>
                            <th>Duración</th>
                            <th>Formación</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPrograma.map((program) => {

                            return (
                                <tr key={program.idPrograma}>
                                    <td>{program.idPrograma}</td>
                                    <td className='align-left'>{program.nombre}</td>
                                    <td>{program.duracion}</td>
                                    <td>{program.nivel}</td>
                                    <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                    <td>
                                        <Link to={`/UpdatePrograma/${program.idPrograma}`}>
                                            <button>
                                                <span class="material-symbols-outlined" id='iconCrud'>
                                                    edit
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td>
                                            <button onClick={() => enableProgram(program.idPrograma)}>
                                                <span class="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                    check_circle
                                                </span>
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button onClick={() => disableProgram(program.idPrograma)}>
                                                <span class="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                    cancel
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
    )
}
