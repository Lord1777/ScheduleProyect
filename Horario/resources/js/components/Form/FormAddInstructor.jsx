import React, { useState } from 'react';
import logoSena from "../../assets/img/LogoSena.png";
import "../../../css/Form/FormAddInstructor.css";
import { getContratoByName, getSedeByName } from '../../hooks/useObjectMapping';
import useFetchPostInstructor from '../../hooks/FetchPOST/useFetchPostInstructor';

const FormAddInstructor = () => {

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [tipoDeDocumento, setTipoDeDocumento] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idContrato, setIdContrato] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [profesion, setProfesion] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [idSede, setIdSede] = useState('');

    const { fetchSubmitInstructor } = useFetchPostInstructor({
        nombreCompleto,
        tipoDeDocumento,
        documento,
        email,
        telefono,
        idContrato,
        ciudad,
        profesion,
        experiencia,
        idSede,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSubmitInstructor();
    }

    return (
        <>

            {/* //FormAddCoordinador usa las mismas clases
                //La interfaz es igual */}
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
                                        id="long"
                                        placeholder='Nombre Completo'
                                        onChange={(e) => setNombreCompleto(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="tipoDeDocumento"
                                        id=""
                                        placeholder='Tipo de Documento'
                                        onChange={(e) => setTipoDeDocumento(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        name="documento"
                                        id=""
                                        placeholder='Número de Documento'
                                        onChange={(e) => setDocumento(e.target.value)}

                                    />

                                    <input
                                        type="text"
                                        name="email"
                                        id="long"
                                        placeholder='E-mail'
                                        onChange={(e) => setEmail(e.target.value)}

                                    />

                                    <input
                                        type="number"
                                        name="telefono"
                                        id=""
                                        placeholder='Telefono'
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="idContrato"
                                        id=""
                                        placeholder='Contrato'
                                        onChange={(e) => setIdContrato(getContratoByName(e.target.value))}

                                    />

                                    <input
                                        type="text"
                                        name="ciudad"
                                        id="long"
                                        placeholder='Ciudad'
                                        onChange={(e) => setCiudad(e.target.value)}
                                    />

                                    <input
                                        type="text"
                                        name="profesion"
                                        id="long"
                                        placeholder='Profesión'
                                        onChange={(e) => setProfesion(e.target.value)}
                                    />

                                    <textarea
                                        name="experiencia"
                                        id="long"
                                        cols="30"
                                        rows="10"
                                        placeholder='Experiencia:'
                                        onChange={(e) => setExperiencia(e.target.value)}
                                    ></textarea>

                                    <input
                                        type="text"
                                        name="idSede"
                                        id=""
                                        placeholder='Sede'
                                        onChange={(e) => setIdSede(getSedeByName(e.target.value))}
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

export default FormAddInstructor
