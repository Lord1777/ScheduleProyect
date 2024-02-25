import React from 'react'
import { CardDeveloper } from '../../components/Cards/CardDeveloper'
import '../../../css/About/AboutDeveloper.css'
import { useNavigate } from 'react-router-dom'
import ricardo from '../../assets/img/Desarrolladores/Ricardo.jpeg'
import cesar from '../../assets/img/Desarrolladores/Cesar.jpg'
import samuel from '../../assets/img/Desarrolladores/Samuel.jpg'

export const AboutDevelopers = () => {

    const Navigate = useNavigate()

    const showNavigation = () => {
        Navigate('/')
    }

    return (
        <>
            <main className='container-About'>
                <div className='btn-title'>
                    <div className='btn-back' onClick={showNavigation}>
                        <span class="material-symbols-outlined">
                            arrow_back
                        </span>
                    </div>
                    <h2>Informacion General</h2>
                </div>
                <div className="container-card-developer">
                    <CardDeveloper
                        developer={samuel}
                        name="Samuel Pulgarin Muñoz"
                        phone="+57 3135698795"
                        email="samuelpulgarin37@gmail.com"
                    />
                    <CardDeveloper
                        developer={ricardo}
                        name="Ricardo Polania Rubiano"
                        phone="+57 3205781997"
                        email="rpolanirubiano@gmail.com"
                    />
                    <CardDeveloper
                        developer={cesar}
                        name="César Adrián Negrón Vente"
                        phone="+57 3165697101"
                        email="cesarnegron16@gmail.com"
                    />
                </div>
            </main>

        </>
    )
}
