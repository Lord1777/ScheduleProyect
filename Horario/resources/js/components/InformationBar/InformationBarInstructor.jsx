import React, { useState } from 'react'
import '../../../css/InformationBar/InformationBar.css'
import useDropdownGet from '../../hooks/useDropdownGet'
import useTrimestreDropdown from '../../hooks/useTrimestreDropdown';
import { useFetchGetRecords } from '../../hooks/FetchGetResources/useFetchGetRecords';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import { useUser } from '../../context/UserContext';

export const InformationBarInstructor = () => {

    const dropdown1 = useDropdownGet();
    const dropdown2 = useDropdownGet();
    const trimestreDropdown = useTrimestreDropdown();

    const { user } = useUser();

    const { dataRecords } = useFetchGetRecords('/getRecords');
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');

    //Buscador
    const [fichaPrograma, setFichaPrograma] = useState("");

    const getRecordId = (nombreRecord) => {
        const record = dataRecords.find((record) => `${record.ficha} - ${record.nombre}` === nombreRecord);
        return record ? record.idFicha : null;
    }
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    const [ fichas, setFichas ] = useState("");

    return (
        <>
            <div className="information_bar">
                <div className="deplegable-horas">

                    <div className={`desplegable1 ${dropdown1.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='fichas'
                            placeholder='Fichas'
                            readOnly
                            onClick={dropdown1.handleDropdown}
                            onChange={(e) => setFichaPrograma(e.target.value)}
                            value={dropdown1.selectedOption}
                        />
                        <div className={`desplegable-options1 ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    className='buscador-desplegables'
                                    id='buscador'
                                    value={fichas}
                                   onChange={(e) => setFichas(e.target.value)} 
                                   />
                            </div>

                            <div className="contenedor-options">
                                {dataRecords && dataRecords.length > 0 && dataRecords
                                    .filter((record) =>
                                        `${record.nombre}`.toLowerCase().startsWith(fichas.toLowerCase())
                                        ||
                                        `${record.ficha}`.toLowerCase().startsWith(fichas.toLowerCase())
                                    )
                                    .map((record) => (
                                        <div className='option' onClick={() => handleOptionClick(`${record.ficha} - ${record.nombre}`)}>
                                            {record.ficha} - {record.nombre}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {trimestreDropdown.showTrimestreDropdown && (
                        <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='trimestres'
                                placeholder='Trimestres'
                                readOnly
                                onClick={dropdown2.handleDropdown}
                                value={dropdown2.selectedOption}
                            />
                            <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                    <div key={quarter.idTrimestre} onClick={() =>
                                        handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)}>
                                        {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3>Total de Horas: {user ? user.userData.horasAsignadas : ''}</h3>
                    </div>
                </div>
                <div className='check_filter'>
                    <label htmlFor="trimestresCheckbox"><h3>Filtra por Trimestres</h3></label>
                    <input
                        className='custom-checkbox'
                        id="trimestresCheckbox"
                        type="checkbox"
                        onChange={trimestreDropdown.toggleTrimestreDropdown} />
                </div>
            </div>
        </>
    )
}
