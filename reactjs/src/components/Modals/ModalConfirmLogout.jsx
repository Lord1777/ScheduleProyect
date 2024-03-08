import React from 'react'
import '../../../css/Modals/ModalConfirmLogout.css'

export const ModalConfirmLogout = ({ open, close, action }) => {
    if (!open) return null;


  return (
    <>
        <main className="box-shadow-modal-logout">
                <div className="box_modal_logout">
                    <div className="container-tittle">
                        <h2>Advertencia</h2>
                    </div>
                    <div className="container-message">
                        <p>¿Estas seguro que quieres cerrar sesión?</p>
                    </div>
                    <div className="modal-logout-btns">
                        <button className='confirmar' onClick={action}>Confirmar</button>
                        <button className='cancelar' onClick={close}>Cancelar</button>
                    </div>
                </div>
            </main>
    </>
  )
}
