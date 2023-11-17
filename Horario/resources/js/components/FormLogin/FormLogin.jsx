import React from 'react'
import '../../../css/FormLogin/FormLogin.css'
import LogoSena from '../../assets/img/LogoSena.png'

export const FormLogin = () => {

    return (
        <>
            <main className='background_form_login'>
                <div className="container_form_login">
                    <div className="container-icon-sena">
                        <img src={LogoSena} alt="LogoSena" />
                    </div>
                    <h2>Ingreso Usuarios Registrados</h2>

                    <form method='POST'>

                        <input type="number" name="N_Documento" placeholder='Número Documento' />

                        <input type="password" name="password" placeholder='Contraseña' />

                        <button>Ingresar</button>
                    </form>
                    
                </div>
            </main>
        </>
    )
}
