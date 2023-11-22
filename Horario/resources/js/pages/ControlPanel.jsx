import React from 'react'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'
import Fondo from '../assets/img/Fondo-login.jpg'

export const ControlPanel = () => {
  return (
    <>
        <CardPControlPanel
        texto="Hola"
        background={Fondo}
        />
    </>
  )
}
