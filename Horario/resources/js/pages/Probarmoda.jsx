import React from 'react'
import { Modal } from '../components/Modals/Modal'
import Exito from '../assets/img/Exito.png'
import Advertencia from '../assets/img/Advertencia.png'

export const Probarmoda = () => {
  return (
    <>
        <Modal
            tittle="Este es un titulo muy chulo"
            imagen={Advertencia}
            message="Pipe es gay"
        />
    </>
  )
}
