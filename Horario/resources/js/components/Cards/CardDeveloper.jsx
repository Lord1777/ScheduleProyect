import React from 'react'
import '../../../css/Cards/CardDeveloper.css'
import ricardo from '../../assets/img/Desarrolladores/Ricardo.jpeg'

export const CardDeveloper = () => {
    return (
        <>
            <div className="card-developer">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner">
                    <div className="container-img">
                        <img src={ricardo} alt="developer" />
                    </div>
                    <div className="content-info-developer">
                        <h3>Ricardo Polania Rubiano</h3>
                        <span>+57 3205781997</span>
                        <span>rpolaniarubiano@gmail.com</span>
                    </div>
                </div>
            </div>
        </>
    )
}
