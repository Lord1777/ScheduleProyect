import React from 'react';
import "../../css/Content/Forbidden.css";
import { useNavigate } from 'react-router-dom';

export const Forbidden = () => {

    const Navigate = useNavigate()

    const goBack = () => {
        Navigate("/")
    }

    return (
        <>
            <div className="body">
                <div class="message">You are not authorized.
                </div>
                <div class="message2">You tried to access a page you did not have prior authorization for.</div>
                <button className='btn-regresar' onClick={goBack}>
                    Regresar
                </button>
                <div class="container">
                    <div class="neon">403</div>
                    <div class="door-frame">
                        <div class="door">
                            <div class="rectangle">
                            </div>
                            <div class="handle">
                            </div>
                            <div class="window">
                                <div class="eye">
                                </div>
                                <div class="eye eye2">
                                </div>
                                <div class="leaf">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
