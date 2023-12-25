import React from 'react'
import { useForm } from 'react-hook-form'
import '../../../css/Form/FormLogin.css'
import LogoSena from '../../assets/img/LogoSena.png'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useDropdown from '../../hooks/useDropdown'
import { TooltipHorario } from '../Tooltips/TooltipHorario'
import { Link } from 'react-router-dom'
import useValidationForm from '../../hooks/useValidationForm'

export const FormLogin = () => {
    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle();
    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown();
    const { TIPO_DOCUMENTO, DOCUMENTO, PASSWORD } = useValidationForm();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
    };

    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className={`dropdown ${isDropdown ? 'open' : ''}`}>
                                <input
                                    type="text"
                                    className='textBox'
                                    placeholder='Tipo de Documento'
                                    readOnly
                                    onClick={handleDropdown}
                                    value={selectedOption}
                                    {...register("tipoDocumento", TIPO_DOCUMENTO)}
                                />
                                <div className={`options ${isDropdown ? 'open' : ''}`}>
                                    <div onClick={() => handleOptionClick('Cedula')}>Cédula</div>
                                    <div onClick={() => handleOptionClick('Tarjeta de Identidad')}>Tarjeta de Identidad</div>
                                    <div onClick={() => handleOptionClick('Cedula de Extranjeria')}>Cédula de Extranjería</div>
                                </div>
                            </div>
                            {errors.tipoDocumento && <p className='errors_forms'>{errors.tipoDocumento.message}</p>}
                        </div>

                        <div>
                            <input
                                type="number"
                                name="N_Documento"
                                placeholder='Número Documento'
                                {...register("documento", DOCUMENTO)}
                            />
                            {errors.documento && <p className='errors_forms'>{errors.documento.message}</p>}
                        </div>

                        <div>
                            <div className="password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    placeholder='Contraseña'
                                    autoComplete='false'
                                    {...register("password", PASSWORD)}
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
