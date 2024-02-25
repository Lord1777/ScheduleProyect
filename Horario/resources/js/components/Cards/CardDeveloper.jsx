import React from 'react'
import '../../../css/Cards/CardDeveloper.css'
import ricardo from '../../assets/img/Desarrolladores/Ricardo.jpeg'

export const CardDeveloper = ({ developer, name, phone, email }) => {
    return (
        <>
            <div className="card-developer">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner">
                    <div className="container-img">
                        <img src={developer} alt="developer" />
                    </div>
                    <div className="content-info-developer">
                        <h3>{name}</h3>
                        <span>{phone}</span>
                        <span>{email}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
