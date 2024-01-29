import React, { useState } from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import '../../../css/Details/DetailsInstructor.css';
import { getContratoByName, getSedeByName } from '../../hooks/useObjectMapping';
import useFetchPostInstructor from '../../hooks/FetchPOST/useFetchPostInstructor';
import logoSena from "../../assets/img/LogoSena.png";

export const DetailsInstructor = () => {

    const [nombre_Completo, set_NombreCompleto] = useState('');
    const [tipo_De_Documento, set_TipoDeDocumento] = useState('');
    const [documentO, set_Documento] = useState('');
    const [emaiL, set_Email] = useState('');
    const [telefonO, set_Telefono] = useState('');
    const [id_Contrato, set_IdContrato] = useState('');
    const [ciudaD, set_Ciudad] = useState('');
    const [profesioN, set_Profesion] = useState('');
    const [experienciA, set_Experiencia] = useState('');
    const [id_Sede, set_IdSede] = useState('');

    const { fetch_SubmitInstructor } = useFetchPostInstructor({
        nombre_Completo,
        tipo_De_Documento,
        documentO,
        emaiL,
        telefonO,
        id_Contrato,
        ciudaD,
        profesioN,
        experienciA,
        id_Sede,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch_SubmitInstructor();
    }

    return (
        <>
            <NavBar></NavBar>

            <main className='container_form_add_instructor'>
                <div className='box_form_instructor'>
                    <div className='container_form_add_elements'>
                        <div className='container_image_form_instructor'>
                            <img src={logoSena} alt='Logo SENA' />
                            <form method='POST' onSubmit={handleSubmit}>
                                <div className="grid-column">
                                    <input
                                        type="text"
                                        name="nombreCompleto"
                                        id="Nombre-Completo"
                                        value='Samuel Pulgarin Muñoz'
                                        onChange={(e) => set_NombreCompleto(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="tipoDeDocumento"
                                        id=""
                                        value='Cédula'
                                        onChange={(e) => set_TipoDeDocumento(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        name="documento"
                                        id=""
                                        value='1107839963'
                                        onChange={(e) => set_Documento(e.target.value)}

                                    />

                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value='samuel@gmail.com'
                                        onChange={(e) => set_Email(e.target.value)}
                                        autoComplete='on'
                                    />

                                    <input
                                        type="number"
                                        name="telefono"
                                        id=""
                                        value='3134563452'
                                        onChange={(e) => set_Telefono(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="idContrato"
                                        id=""
                                        value='Contratista'
                                        onChange={(e) => set_IdContrato(getContratoByName(e.target.value))}

                                    />

                                    <input
                                        type="text"
                                        name="ciudad"
                                        id="CiudaD"
                                        value='Palmira'
                                        onChange={(e) => set_Ciudad(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="profesion"
                                        id="Profesion"
                                        placeholder='Profesión'
                                        onChange={(e) => set_Profesion(e.target.value)}
                                    />

                                    <textarea
                                        name="experiencia"
                                        id="long"
                                        cols="30"
                                        rows="10"
                                        placeholder='Experiencia:'
                                        onChange={(e) => set_Experiencia(e.target.value)}
                                    ></textarea>

                                    <input
                                        type="text"
                                        name="idSede"
                                        id=""
                                        value='CBI - Palmira'
                                        onChange={(e) => set_IdSede(getSedeByName(e.target.value))}
                                    />
                                </div>
                                <div className="container-btns">
                                    <button className='guardar'>Guardar</button>
                                    <button className='cancelar'>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
