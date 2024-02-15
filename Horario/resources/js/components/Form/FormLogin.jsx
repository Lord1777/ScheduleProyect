import React from 'react'
import LogoSena from '../../assets/img/LogoSena.png'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useDropdownLogin from '../../hooks/useDropdownLogin'
import useValidationForm from '../../hooks/useValidationForm'
import useFetchLogin from '../../hooks/FetchPOST/useFetchLogin'
import { useForm } from 'react-hook-form'
import { TooltipHorario } from '../Tooltips/TooltipHorario'
import { Link } from 'react-router-dom'
import '../../../css/Form/FormLogin.css'
import { Loading } from '../Loading/Loading'




export const FormLogin = () => {
    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { isDropdown, handleDropdown, handleOptionClick } = useDropdownLogin(setValue, "tipoDocumento");

    const [tipoDocumentoValue, setTipoDocumentoValue] = React.useState('');
    const { TIPO_DOCUMENTO, DOCUMENTO, PASSWORD } = useValidationForm();

    const { authUser, loading, setLoading } = useFetchLogin('/login');

    const onSubmit = async (data) => {
        setLoading(true);
        await authUser(data.documento, password);
        setLoading(false);
    };

    if(loading){
        return <Loading/>
    }


    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                        <h2 className='name-proyect'><span>Advanced Schedule Planning Software</span></h2>
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid-column'>
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
                                <div className="password">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        placeholder='Contraseña'
                                        autoComplete='false'
                                    />
                                    <img src={showPassword ? OpenEye : CloseEye} onClick={handleTogglePassword} />
                                </div>
                                {errors.password && <p className='errors_forms'>{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="container-p">
                            <Link to={'/RecuperarContraseña'}>
                                <h2>Olvide mi contraseña</h2>
                            </Link>
                        </div>

                        <button type="submit">Ingresar</button>
                    </form>
                </div>
                <TooltipHorario></TooltipHorario>
            </main>
        </>
    );
};
