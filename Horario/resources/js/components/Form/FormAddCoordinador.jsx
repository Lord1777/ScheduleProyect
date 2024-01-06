import React from 'react';
import logoSena from '../../assets/img/LogoSena.png';

export const FormAddCoordinador = () => {
    return (
        <>
            <main className='container_form_add_instructor'>
                <div className='box_form_instructor'>
                    <div className='container_form_add_elements'>
                        <div className='container_image_form_instructor'>
                            <img src={logoSena} alt='Logo SENA' />

                            <form method='POST'>
                                <div className="grid-column">
                                    <input
                                        type="text"
                                        name=""
                                        id="long"
                                        placeholder='Nombre Completo'
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                    />

                                    <input
                                        type="number"
                                        name=""
                                        id=""
                                        placeholder='Número de Documento'
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id="long"
                                        placeholder='E-mail'
                                    />

                                    <input
                                        type="number"
                                        name=""
                                        id=""
                                        placeholder='Telefono'
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id="long"
                                        placeholder='Ciudad'
                                    />

                                    <input
                                        type="text"
                                        name=""
                                        id="long"
                                        placeholder='Profesión'
                                    />

                                    <textarea
                                        name=""
                                        id="long"
                                        cols="30"
                                        rows="10"
                                        placeholder='Experiencia:'
                                    ></textarea>

                                    <input type="text" name="" id="" />
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
