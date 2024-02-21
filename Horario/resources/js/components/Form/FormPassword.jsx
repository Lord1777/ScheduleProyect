import React from 'react'
import '../../../css/Form/FormPassword.css'
import LogoSena from '../../assets/img/LogoSena.png'
import useValidationForm from '../../hooks/useValidationForm'
import useFetchLogin from '../../hooks/FetchPOST/useFetchLogin'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useFetchPostForgotPassword } from '../../hooks/FetchPOST/useFetchPostForgotPassword'


export const FormPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { EMAIL } = useValidationForm();

    const { handleForgotPassword } = useFetchPostForgotPassword('/forgot-password');

    const onSubmit = async (data) => {
        await handleForgotPassword(data.email);
    };

    return (
        <>
            <main className='background'>
                <div className="container_form_password">
                    <div className="container-icon-sena-password">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Restablecer contraseña</h2>

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
                                        {...register("email",EMAIL)}
                                    />
                                </div>
                                {errors.email && <p className='errors_forms'>{errors.email.message}</p>}
                            </div>
                        </div>

                        <button type="submit">Enviar correo</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default FormPassword;