import React from 'react';
import '../../../css/Details/formDetailsFicha.css';
import '../../../css/Form/BoxContainerFormAdd.css';
import  useDropdown  from '../../hooks/useDropdown.js';
import { useParams } from 'react-router-dom';

export const FormDetailsFicha = () => {

  const dropdown1 = useDropdown();
  const dropdown2 = useDropdown();
  const dropdown3 = useDropdown();
  return (

    <>
      <main className='container_all_form'>
        <div className='box_form'>
          <h2 className='title_underline'>Detalles de la Ficha</h2>
          <div className='container_form_add'>
            <form method='POST'>
              <div className='grid-column'>
                <input type='number' name='NFicha' defaultValue='2560354' />

                <input type='number' name='Duracion' defaultValue='3000' />

                <input type='text' name='Programa' defaultValue='Análisis y desarrollo de software' />

                <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                  <input
                    type='text'
                    className='textBox'
                    readOnly
                    onClick={dropdown1.handleDropdown}
                    defaultValue='Presencial'
                  />
                  <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                    <div onClick={() => dropdown1.handleOptionClick('Presencial')}>Presencial</div>
                    <div onClick={() => dropdown1.handleOptionClick('Virtual')}>Virtual</div>
                  </div>
                </div>

                <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                  <input
                    type='text'
                    className='textBox'
                    readOnly
                    onClick={dropdown2.handleDropdown}
                    defaultValue='Tecnólogo'
                  />
                  <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                    <div onClick={() => dropdown2.handleOptionClick('Tecnico')}>Técnico</div>
                    <div onClick={() => dropdown2.handleOptionClick('Tecnologo')}>Tecnólogo</div>
                  </div>
                </div>

                <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                  <input
                    type='text'
                    className='textBox'
                    readOnly
                    onClick={dropdown3.handleDropdown}
                    defaultValue='Jornada - Diurna'
                  />
                  <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                    <div onClick={() => dropdown3.handleOptionClick('Diurna')}>Jornada - Diurna</div>
                    <div onClick={() => dropdown3.handleOptionClick('Nocturna')}>Jornada - Nocturna</div>
                  </div>
                </div>
              </div>
              <div className="container-btns">
                <button className='crear-horario'>Crear Horario</button>
                <button className='guardar'>Guardar</button>
                <button className='cancelar'>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>

  )
}

export default FormDetailsFicha;