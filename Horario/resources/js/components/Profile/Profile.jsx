import React, { useState, useEffect} from 'react'
import '../../../css/Profile/Profile.css'
import logoSena from "../../assets/img/LogoSena.png";
import { useUser } from '../../context/UserContext';
import {  getContratoById, getSedeById } from '../../hooks/useObjectMapping';
import { Loading } from '../Loading/Loading';
import { ModalChangePassword } from '../Modals/ModalChangePassword';
import useModal from '../../hooks/useModal';


export const Profile = () => {

    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const { isModal, ShowOpenModal, ShowCloseModal, } = useModal();

    useEffect(() => {
        if (user && user.userData) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <Loading/>
    }

    const userData = user.userData;
    console.log(userData)
    let contrato = getContratoById(userData.idContrato);
    let sede = getSedeById(userData.idSede);

    return (
        <>
            <main className='container-my-profile'>
                <div className="box-form">
                    <div className='content-tittle-profile'>
                        <h2>Perfil</h2>
                    </div>
                    
                    <div className="container-form-profile">
                            <form method="get">
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Nombre'
                                        name='nombreCompleto'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        id='input-large'
                                        defaultValue={userData.nombreCompleto} 
                                    />
                                </div>

                                <div className='container-inputs'>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Tipo Documento'
                                            name='TipoDocumento'
                                            autoComplete='off'
                                            readOnly
                                            disabled='on'
                                            defaultValue={userData.tipoDocumento} 
                                            />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Documento'
                                            name='documento'
                                            autoComplete='off'
                                            readOnly
                                            disabled='on'
                                            defaultValue={userData.documento} 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder='Email'
                                        name='email'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        id='input-large'
                                        defaultValue={userData.email} 
                                        />
                                </div>

                                <div className='container-inputs'>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Telefono'
                                            name='telefono'
                                            autoComplete='off'
                                            readOnly
                                            disabled='on'
                                            defaultValue={userData.telefono} 
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Tipo Contrato'
                                            name='contrato'
                                            autoComplete='off'
                                            readOnly
                                            disabled='on'
                                            defaultValue={contrato} 
                                            />
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder='Ciudad'
                                        name='ciudad'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        id='input-large'
                                        defaultValue={userData.ciudad} 
                                        />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder='Profeción'
                                        name='profesion'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        id='input-large'
                                        defaultValue={userData.profesion} 
                                        />
                                </div>

                                <div>
                                    <textarea
                                        name="experiencia"
                                        className='textArea'
                                        cols="30"
                                        rows="10"
                                        placeholder='Experiencia:'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        defaultValue={userData.experiencia} 
                                    ></textarea>
                                </div>

                                <div className="container-input-buton">
                                    <input
                                        type="text"
                                        placeholder='Sede'
                                        name='Sede'
                                        autoComplete='off'
                                        readOnly
                                        disabled='on'
                                        defaultValue={sede} 
                                        />
                                    <button onClick={ShowOpenModal}>
                                        Cambiar Contraseña
                                    </button>
                                </div>

                            </form>
                        </div>
                </div>
            </main>
            <ModalChangePassword
            IdUser={userData.idUsuario}
            open={isModal}
            close={ShowCloseModal}
            />
        </>
    )
}
