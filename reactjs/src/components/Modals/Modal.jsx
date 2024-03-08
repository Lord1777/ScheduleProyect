import React from 'react'
import '../../../css/Modals/Modal.css'
import { useNavigate } from 'react-router-dom'


export const Modal = ({ tittle, imagen, message, route, open, close, funcion }) => {
    if (!open) return null;

    const Navigate = useNavigate()

    const handleContinue = () => {
        close(); // Cierra el modal
        if(funcion){
            funcion();
        }
        if (route) {
            Navigate(route);
        }
    };

    const handleCancel = () => {
        close(); // Cierra el modal
    };


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
                        <button className='confirmar' onClick={handleContinue}>Continuar</button>
                        <button className='cancelar' onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </main>
        </>
    )
}
