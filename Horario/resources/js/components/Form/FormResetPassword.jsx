import React from 'react'
import '../../../css/Form/FormPassword.css'
import LogoSena from '../../assets/img/LogoSena.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useDropdownLogin from '../../hooks/useDropdownLogin'
import useValidationForm from '../../hooks/useValidationForm'
import useFetchLogin from '../../hooks/FetchPOST/useFetchLogin'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'




export const FormResetPassword = () => {
    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { isDropdown, handleDropdown, handleOptionClick } = useDropdownLogin(setValue, "tipoDocumento");

    const [tipoDocumentoValue, setTipoDocumentoValue] = React.useState('');
    const { TIPO_DOCUMENTO, DOCUMENTO, PASSWORD } = useValidationForm();

    const { authUser, loading } = useFetchLogin('/login');

    const onSubmit = async (data) => {
        await authUser(data.documento, password);
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
                            <div className={`dropdown ${isDropdown ? 'open' : ''}`}>
                                <input
                                    type="text"
                                    className='textBox'
                                    name='tipoDeDocumento'
                                    placeholder='Tipo de Documento'
                                    readOnly
                                    onClick={handleDropdown}
                                    value={tipoDocumentoValue}
                                    {...register("tipoDocumento", TIPO_DOCUMENTO)}
                                />
                                <div className={`options ${isDropdown ? 'open' : ''}`}>
                                    <div onClick={() => handleOptionClick('Cedula', setTipoDocumentoValue)}>Cédula</div>
                                    <div onClick={() => handleOptionClick('Cedula de Extranjeria', setTipoDocumentoValue)}>Cédula de Extranjería</div>
                                </div>
                            </div>
                            {errors.tipoDocumento && <p className='errors_forms'>{errors.tipoDocumento.message}</p>}


                            <div>
                                <input
                                    type="number"
                                    name="documento"
                                    placeholder='Número Documento'
                                    autoComplete='off'
                                    {...register("documento", DOCUMENTO)}
                                />
                                {errors.documento && <p className='errors_forms'>{errors.documento.message}</p>}
                            </div>

                            <div>
                                <div>
                                    <input
                                        type={'text'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        placeholder='Correo electrónico'
                                        autoComplete='off'
                                    />
                                </div>
                                {errors.password && <p className='errors_forms'>{errors.password.message}</p>}
                            </div>
                        </div>

                        <button type="submit">Restablecer</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default FormPassword;