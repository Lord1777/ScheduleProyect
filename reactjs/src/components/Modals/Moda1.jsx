import React from 'react'
import '../../../css/Modals/Modal.css'
import { useNavigate } from 'react-router-dom'

export const Moda1 = ({ tittle, imagen, message, route, open }) => {
    if (!open) return null;

    const Navigate = useNavigate()
    const Navegar = () => {
        Navigate(`/${route}`)
    }

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
                        <button className='confirmar' onClick={Navegar}>Continuar</button>
                    </div>
                </div>
            </main>
        </>
    )
}
