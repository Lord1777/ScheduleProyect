import React, { useEffect } from 'react';
import "../../css/Content/Forbidden.css";

export const Forbidden = () => {

    return (
        <>
            <div className="body">
                <div class="message">You are not authorized.
                </div>
                <div class="message2">You tried to access a page you did not have prior authorization for.</div>
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
