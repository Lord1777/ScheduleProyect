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
                <div className="container-text">
                    <p>
                        Bienvenido a nuestro aplicativo web de planificación de horarios para el Servicio Nacional de Aprendizaje (SENA).
                        En nuestro equipo de desarrollo, nos enorgullece presentar esta herramienta diseñada para facilitar la gestión eficiente
                        de los horarios de los programas de formación ofrecidos por el SENA.
                    </p>
                    <p>
                        Nuestra misión es optimizar el proceso de planificación de horarios,
                        brindando una solución intuitiva y fácil de usar que satisfaga las necesidades
                        de los instructores, aprendices y principalmente coordinadores del SENA. Con un enfoque centrado en
                        el usuario, nos hemos esforzado por crear una plataforma que simplifique la programación
                        de clases, permitiendo una distribución equitativa de los recursos y maximizando el
                        aprovechamiento del tiempo de aprendizaje.
                    </p>
                </div>

                <div className="container-card-developer">
                    <CardDeveloper
                        developer={samuel}
                        name="Samuel Pulgarin Muñoz"
                        phone="+57 3135698795"
                        email="samuelpulgarin37@gmail.com"
                        rol="Full Stack"
                    />
                    <CardDeveloper
                        developer={ricardo}
                        name="Ricardo Polania Rubiano"
                        phone="+57 3205781997"
                        email="rpolanirubiano@gmail.com"
                        rol="Full Stack"
                    />
                    <CardDeveloper
                        developer={cesar}
                        name="César Adrián Negrón Vente"
                        phone="+57 3165697101"
                        email="cesarnegron16@gmail.com"
                        rol="Full Stack"
                    />
                </div>
            </main>

        </>
    )
}
