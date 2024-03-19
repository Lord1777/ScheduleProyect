import React, { useState } from 'react'
import '../../../css/Form/FormPassword.css'
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import LogoSena from '../../assets/img/LogoSena.jpeg'
import useValidationForm from '../../hooks/useValidationForm'
import useFetchLogin from '../../hooks/FetchPOST/useFetchLogin'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useFetchPostForgotPassword } from '../../hooks/FetchPOST/useFetchPostForgotPassword'
import { ContinuoModal } from '../Modals/ContinuoModal'
import { Loading } from '../Loading/Loading'


export const FormPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { EMAIL } = useValidationForm();
    const [ loading, setLoading ] = useState(false);

    const {
        handleForgotPassword,
        successModalOpen,
        closeSuccessModal,
        errorModalOpen,
        closeErrorModal,
        alertMessage,
        ruta
    } = useFetchPostForgotPassword('/forgot-password');

    const onSubmit = async (data) => {
        setLoading(true);
        await handleForgotPassword(data.email);
        setLoading(false);
    };

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <main className='background'>
                <div className="container_form_password">
                    <div className="container-icon-sena-password">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2 id='restablecer-contraseña-h2' >Restablecer contraseña</h2>

                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid-column-password'>
                            <div>
                                <div>
                                    <input
                                        type={'text'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="email"
                                        placeholder='Correo electrónico'
                                        autoComplete='off'
                                        {...register("email", EMAIL)}
                                    />
                                </div>
                                {errors.email && <p className='errors_forms'>{errors.email.message}</p>}
                            </div>
                        </div>

                        <button type="submit">Enviar correo</button>
                        <Link to={'/'}>
                        <button className='volver'>
                            Volver
                        </button>
                    </Link>
                    </form>
                </div>
            </main>
            <ContinuoModal
            tittle="Error"
            imagen={error}
            message={alertMessage}
            open={errorModalOpen}
            close={closeErrorModal}
            />
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message={alertMessage}
                open={successModalOpen}
                close={closeSuccessModal}
                route={ruta}
            />
        </>
    );
};

export default FormPassword;