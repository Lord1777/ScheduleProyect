import React from 'react'
import '../../../css/Form/ConsultHorarioAprenttice.css'
import logosena from '../../assets/img/LogoSena.png'

export const ConsultHorarioAprenttice = () => {
    return (
        <>
            <main className='background-consult-horario'>
                <div className="container-consult-form">
                    <img src={logosena} alt="sena" />
                    <h2>Consultar Horario</h2>
                    <form method='POST'>
                        
                        <div className="select-ficha">
                            <input type="text" 
                            className='textBox'
                            placeholder='Seleccionar Ficha'
                            />
                            <div className="options">
                                
                                <div>2560354 - Analis y desarrollo de software</div>
                                <div>6821632 - Contabilidad</div>
                                <div>2783190 - Gestión bancaria</div>
                                <div>2132163 - Recursos Humanos</div>
                                <div>2560354 - Analis y desarrollo de software</div>
                                <div>6821632 - Contabilidad</div>
                                <div>2783190 - Gestión bancaria</div>
                                <div>2132163 - Recursos Humanos</div>
                            </div>
                        </div>

                        <button>Consultar</button>
                    </form>
                </div>
            </main>
        </>
    )
}
