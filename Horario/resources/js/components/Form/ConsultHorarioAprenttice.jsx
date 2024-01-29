import React from 'react'
import logosena from '../../assets/img/LogoSena.png'
import useDropdown from '../../hooks/useDropdown'
import '../../../css/Form/ConsultHorarioAprenttice.css'

export const ConsultHorarioAprenttice = () => {

    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown();

    return (
        <>
            <main className='background-consult-horario'>
                <div className="container-consult-form">
                    <img src={logosena} alt="sena" />
                    <h2>Consultar Horario</h2>
                    <form method='POST'>

                        <div className={`select-ficha ${isDropdown ? 'open' : ''}`}>
                            <input type="text"
                                className='textBox'
                                placeholder='Seleccionar Ficha'
                                onClick={handleDropdown}
                                value={selectedOption}
                                id='select-ficha'
                            />
                            <div className={`container-options ${isDropdown ? 'open' : ''}`}>
                                <div className="container-search">
                                    <input type="search" placeholder='Buscar' id='search' />
                                </div>
                                <div className="options">
                                    <div className='option' onClick={() => handleOptionClick('2560354 - Analisis y desarrollo de software')}>2560354 - Analisis y desarrollo de software</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>6821632 - Contabilidad</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>2783190 - Gestión bancaria</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>2132163 - Recursos Humanos</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>2560354 - Analis y desarrollo de software</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>6821632 - Contabilidad</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>2783190 - Gestión bancaria</div>
                                    <div className='option' onClick={() => handleOptionClick('6821632 - Contabilidad')}>2132163 - Recursos Humanos</div>
                                </div>
                            </div>
                        </div>

                        <button>Consultar</button>
                    </form>
                </div>
            </main>
        </>
    )
}
