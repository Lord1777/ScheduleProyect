import React from 'react'
import '../../../css/Modals/Modal.css'

export const Modal = ( { tittle, imagen, message } ) => {
    return (
        <>
            <main className="box-shadow-modal">
                <div className="box_modal">
                    <div className="container-tittle">
                        <h2>{tittle}</h2>
                    </div>
                    <div className="container-img-modal">
                        <img src={imagen} alt="imagen" />
                    </div>
                    <div className="container-message">
                        <p>{message}</p>
                    </div>
                    <div className="modal-btns">
                        <button className='confirmar'>Confirmar</button>
                        <button className='cancelar'>Cancelar</button>
                    </div>
                </div>
            </main>
        </>
    )
}
