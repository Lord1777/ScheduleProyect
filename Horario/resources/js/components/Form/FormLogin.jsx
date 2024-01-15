import React from 'react'
import { useForm } from 'react-hook-form'
import '../../../css/Form/FormLogin.css'
import LogoSena from '../../assets/img/LogoSena.png'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useDropdownLogin from '../../hooks/useDropdownLogin'
import { TooltipHorario } from '../Tooltips/TooltipHorario'
import { Link } from 'react-router-dom'
import useValidationForm from '../../hooks/useValidationForm'
import useFetchLogin from '../../hooks/FetchPOST/useFetchLogin'



export const FormLogin = () => {
    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { isDropdown, handleDropdown, handleOptionClick } = useDropdownLogin(setValue, "tipoDocumento");

    const [tipoDocumentoValue, setTipoDocumentoValue] = React.useState('');
    const { TIPO_DOCUMENTO, DOCUMENTO, PASSWORD } = useValidationForm();


    const { authUser } = useFetchLogin();


    const onSubmit = async (data) => {
        await authUser(data.documento, password);
    };

    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>

                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
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
                        </div>

                        <div>
                            <input
                                type="number"
                                name="documento"
                                placeholder='Número Documento'
                                {...register("documento", DOCUMENTO)}
                            />
                            {errors.documento && <p className='errors_forms'>{errors.documento.message}</p>}
                        </div>

                        <div>
                            <div className="password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    placeholder='Contraseña'
                                    autoComplete='false'
                                //{...register("password", PASSWORD)}
                                />
                                <img src={showPassword ? OpenEye : CloseEye} onClick={handleTogglePassword} />
                            </div>
                            {errors.password && <p className='errors_forms'>{errors.password.message}</p>}
                        </div>

                        <div className="container-p">
                            <h3>Olvidé mi Contraseña</h3>
                        </div>

                        <button type="submit">Ingresar</button>
                    </form>
                </div>
                <TooltipHorario></TooltipHorario>
            </main>
        </>
    );
};
