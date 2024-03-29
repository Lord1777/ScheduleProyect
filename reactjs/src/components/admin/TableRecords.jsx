import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { useFetchPutManageRecord } from '../../hooks/FetchPUT/useFetchPutManageRecord';
import useFetchGetRecord from '../../hooks/FetchGET/useFetchGetRecord';
import '../../../css/admin/Board.css';
import '../../../css/admin/SearchButtons.css';
import '../../../css/admin/TableInstructors.css';

export const TableRecords = () => {

    const [disabled, setDisabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [Ficha, setFicha] = useState("");

    const { dataRecord, fetchData, loading, setLoading } = useFetchGetRecord(
        disabled ? '/getDisableRecords' : '/getEnabledRecords',
        currentPage,
        Ficha
    );

    let totalPage = dataRecord.last_page;

    const { fetchManageRecord } = useFetchPutManageRecord();

    const enableRecord = async (idFicha) => {
        setLoading(true);
        await fetchManageRecord(`/enableRecord`, idFicha);
        await fetchData();
        setLoading(false);
    }
    const disableRecord = async (idFicha) => {
        setLoading(true);
        await fetchManageRecord(`/disableRecord`, idFicha);
        await fetchData();
        setLoading(false);
    }

    /* Buscador */

    const filteredFicha = dataRecord && dataRecord.data
        ? dataRecord.data.filter((record) => {
            return (
                `${record.ficha}`.toLowerCase().startsWith(Ficha.toLowerCase()) ||
                record.nombre.toLowerCase().startsWith(Ficha.toLowerCase())
            );
        })
        : [];

    useEffect(() => {
        fetchData();
    }, [currentPage, Ficha]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h2 className='title'>Administrar Fichas {disabled ? 'Inhabilitadas' : 'Habilitadas'}</h2>
            <div className="container-search-buttons">
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar por ficha o programa"
                        autoComplete='off'
                        value={Ficha}
                        onChange={(e) => setFicha(e.target.value)}
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
                    <Link to='/AddFicha'>
                        <button type="button">Añadir Ficha</button>
                    </Link>
                </div>
            </div>

            <div className="container_table_crud">
                <table className='content_table'>
                    <thead>
                        <tr>
                            <th>Ficha</th>
                            <th className='align-left'>Programa</th>
                            <th>Nivel de Formación</th>
                            <th>Jornada</th>
                            <th>Modalidad</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            <th>Horario</th>
                            {disabled ? <th>Habilitar</th> : <th>Inhabilitar</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFicha.length === 0 || filteredFicha.size === 0 ? (
                            <tr className='notResult'>
                                <td>No hay resultados</td>
                            </tr>
                        ) : (
                        filteredFicha.map((record) => {

                            return (
                                <tr key={record.id}>
                                    <td>{record.ficha}</td>
                                    <td className='align-left'>{record.nombre}</td>
                                    <td>{record.nivel}</td>
                                    <td>{record.jornada}</td>
                                    <td>{record.modalidad}</td>
                                    <td>{disabled ? 'Inhabilitado' : 'Habilitado'}</td>
                                    <td>
                                        <Link to={`/UpdateFicha/${record.idFicha}`}>
                                            <button>
                                                <span className="material-symbols-outlined" id='iconCrud'>
                                                    edit
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/AddHorario/${record.idFicha}`}>
                                            <button>
                                                <span class="material-symbols-outlined" id='iconCrud'>
                                                    calendar_add_on
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                    {disabled ? (
                                        <td key={`habilitar-${record.idFicha}`}>
                                            <button onClick={() => enableRecord(record.idFicha)}>
                                                <span className="material-symbols-outlined iconHabilitar" id='iconCrud'>
                                                    check_circle
                                                </span>
                                            </button>
                                        </td>
                                    ) : (
                                        <td key={`inhabilitar-${record.idFicha}`}>
                                            <button onClick={() => disableRecord(record.idFicha)}>
                                                <span className="material-symbols-outlined iconInhabilitar" id='iconCrud'>
                                                    cancel
                                                </span>
                                            </button>
                                        </td>

                                    )}
                                </tr>
                            )
                        }))}
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
