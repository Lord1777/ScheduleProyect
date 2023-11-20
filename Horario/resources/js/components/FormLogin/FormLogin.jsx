import React from 'react'
import '../../../css/FormLogin/FormLogin.css'
import LogoSena from '../../assets/img/LogoSena.png'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'

export const FormLogin = () => {

    const { password, showPassword, setPassword, handleTogglePassword } = usePasswordToggle()

    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>

                    <form method='POST'>

                        <div className="dropdown">
                            <input type="text" className='textBox'
                            placeholder='Tipo de Documneto' readOnly/>
                            <div className="options">
                                <div>Cédula</div>
                                <div>Targeta de Identidad</div>
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
                            <img src={showPassword ? OpenEye : CloseEye} alt="" onClick={handleTogglePassword} />
                        </div>
                        <div className="container-p">
                            <h3>Olvide mi Contraseña</h3>
                        </div>

                        <button>Ingresar</button>

                        <h3>Crear Cuenta</h3>
                    </form>

                </div>
            </main>
        </>
    )
}

                        {/* <div className="select_TDocumento">
                            <select name="T_Documento" id="T_Documento">
                                <option value="" selected disabled >
                                    Tipo de Documento
                                </option>
                                <option value="Cédula">Cédula</option>
                                <option value="Targeta de Indentidad">Targeta de Idetidad</option>
                            </select>
                        </div> */}