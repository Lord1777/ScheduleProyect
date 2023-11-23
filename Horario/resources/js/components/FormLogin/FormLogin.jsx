import React from 'react'
import '../../../css/FormLogin/FormLogin.css'
import LogoSena from '../../assets/img/LogoSena.png'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useDropdown from '../../hooks/useDropdown'
import { TooltipHorario } from '../Tooltips/TooltipHorario'

export const FormLogin = () => {

    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle();
    const { isDropdown, selectedOption, handleDropdown, handleOptionClick} = useDropdown();


    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>

                    <form method='POST'>

                        <div className={`dropdown ${isDropdown ? 'open' : ''}`}>
                            <input type="text" 
                            className='textBox'
                            placeholder='Tipo de Documento' readOnly
                            onClick={handleDropdown}
                            value={selectedOption}
                            />
                            <div className={`options ${isDropdown ? 'open' : ''}`}>
                                <div onClick={() => handleOptionClick('Cedula')}>Cédula</div>
                                <div onClick={() => handleOptionClick('Tarjeta de Identidad')}>Tarjeta de Identidad</div>
                            </div>
                        </div>

                        <input type="number" name="N_Documento" placeholder='Número Documento' />

                        <div className="password">
                            <input type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                placeholder='Contraseña'
                                autoComplete='false' />
                            <img src={showPassword ? OpenEye : CloseEye} onClick={handleTogglePassword} />
                        </div>
                        <div className="container-p">
                            <h3>Olvide mi Contraseña</h3>
                        </div>

                        <button>Ingresar</button>

                        <h3>Crear Cuenta</h3>
                    </form>

                </div>
                <TooltipHorario></TooltipHorario>
            </main>
        </>
    )
}
