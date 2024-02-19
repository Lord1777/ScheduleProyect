import React, { useEffect, useState } from 'react'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'
import { NavBar } from '../components/NavBar/NavBar';
import { Link } from 'react-router-dom'
import Instructores from '../assets/img/Instructores.jpg'
import Fichas from '../assets/img/Fichas.jpg'
import Coordinadores from '../assets/img/Coordinadores.jpg'
import Ambientes from '../assets/img/Ambiente.jpg'
import Tiempo from '../assets/img/Tiempo.jpg'
import S from '../assets/img/S.jpg'
import PR from '../assets/img/PR.jpg'
import { useUser } from '../context/UserContext';
import { ChangePasswordFirts } from '../components/Modals/ChangePasswordFirts';
import useFecthPutPassword from '../hooks/FetchPUT/useFecthPutPassword';
import { Loading } from '../components/Loading/Loading';


export const ControlPanel = () => {

    const { user } = useUser();
    const {
        openPasswordModal,
        closePasswordModal,
        modalChangePasword 
    } = useFecthPutPassword();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.userData) {
            setLoading(false);
            if (user.userData.sesion === 0) {
                openPasswordModal();
            }
        }
    }, [user]);

    if (loading) {
        return <Loading />
    }

    const userData = user.userData;

    return (
        <>
            <NavBar />
            <div className="container-all-panel">
                <h2>Panel de Control</h2>
                <div className="container-cardsPanel">

                    <Link to='/CrudInstructor' >
                        <CardPControlPanel
                            img={Instructores}
                            text="Instructores"
                        />
                    </Link>

                    <Link to={'/CrudCoordinadores'} >
                        <CardPControlPanel
                            img={Coordinadores}
                            text="Coordinadores"
                        />
                    </Link>

                    <Link to={'/CrudAmbientes'} >
                        <CardPControlPanel
                            img={Ambientes}
                            text="Ambientes"
                        />
                    </Link>

                    <Link to={'/CrudFichas'} >
                        <CardPControlPanel
                            img={Fichas}
                            text="Fichas"
                        />
                    </Link>

                    <Link to={'/CrudProgramas'} >
                        <CardPControlPanel
                            img={PR}
                            text="Programas"
                        />
                    </Link>

                    <Link to={'/CrudTrimestres'} >
                        <CardPControlPanel
                            img={Tiempo}
                            text="Trimestres"
                        />
                    </Link>

                    <Link to={'/PanelHorarios'} >
                        <CardPControlPanel
                            img={S}
                            text="Horarios"
                        />
                    </Link>

                </div>
            </div>
            <ChangePasswordFirts
                IdUser={userData.idUsuario}
                open={modalChangePasword}
                close={closePasswordModal}
            />
        </>
    )
}
