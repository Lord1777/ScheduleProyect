import React from 'react'
import '../../../css/Cards/CardDeveloper.css'

export const CardDeveloper = ({ developer, name, phone, email, rol }) => {
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
                        <span>Rol: {rol}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
