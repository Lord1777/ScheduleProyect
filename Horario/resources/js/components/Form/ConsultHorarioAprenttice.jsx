import React, { useState } from 'react';
import { useFetchGetRecords } from '../../hooks/FetchGetResources/useFetchGetRecords'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import logosena from '../../assets/img/LogoSena.jpeg'
import useDropdown from '../../hooks/useDropdown'
import '../../../css/Form/ConsultHorarioAprenttice.css'



export const ConsultHorarioAprenttice = () => {

    const { register, setValue, handleSubmit } = useForm();

    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown(setValue, "ficha");

    const { dataRecords } = useFetchGetRecords('/getRecords');
    //console.log(dataRecords);

    const navigate = useNavigate();

    const getRecordId = (nombreRecord) => {
        const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
        return record ? record.idFicha : null;
    }

    const onSubmit = (data) => {
        navigate(`/HorarioAprendiz/${getRecordId(data.ficha)}`);
    }

    /*Buscador*/
    const [fichaPrograma, setFichaPrograma] = useState("");

    return (
        <>
            <main className='background-consult-horario'>
                <div className="container-consult-form">
                    <img src={logosena} alt="sena" id='sena' />
                    <h2>Consultar Horario</h2>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)}>

                        <div className={`select-ficha ${isDropdown ? 'open' : ''}`}>
                            <input type="text"
                                className='textBox'
                                placeholder='Seleccionar Ficha'
                                autoComplete='off'
                                onClick={handleDropdown}
                                value={selectedOption}
                                id='select-ficha'
                                {...register('ficha')}
                            />
                            <div className={`container-options ${isDropdown ? 'open' : ''}`}>
                                <div className="container-search">
                                    <input
                                        type="search"
                                        placeholder='Buscar'
                                        id='search'
                                        value={fichaPrograma}
                                        onChange={(e) => setFichaPrograma(e.target.value)}
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="options">
                                    {dataRecords && dataRecords.length > 0 && dataRecords
                                        .filter((record) =>
                                            `${record.nombre}`.toLowerCase().startsWith(fichaPrograma.toLowerCase()) ||
                                            `${record.ficha}`.toLowerCase().startsWith(fichaPrograma.toLowerCase())
                                        )
                                        .map((record) => (
                                            <div  key={record.idFicha} className='option' onClick={() => handleOptionClick(`${record.ficha} - ${record.nombre}`)}>
                                                {record.ficha} - {record.nombre}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <button>
                            Consultar
                        </button>
                    </form>
                    <Link to={'/'}>
                        <button className='Volver'>
                            Volver
                        </button>
                    </Link>
                </div>
            </main>
        </>
    )
}
