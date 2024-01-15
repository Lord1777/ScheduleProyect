import React, { useEffect } from 'react';
import "../../css/Content/Forbidden.css";

export const Forbidden = () => {

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
          document.body.classList.remove('no-scroll');
        };
      }, []);

    const interval = 500;

    function generateLocks() {
        const lock = document.createElement('div'),
            position = generatePosition();
        lock.innerHTML = '<div class="top"></div><div class="bottom"></div>';
        lock.style.top = position[0];
        lock.style.left = position[1];
        lock.classList = 'lock'// generated';
        document.body.appendChild(lock);
        setTimeout(() => {
            lock.style.opacity = '1';
            lock.classList.add('generated');
        }, 100);
        setTimeout(() => {
            lock.parentElement.removeChild(lock);
        }, 2000);
    }
    function generatePosition() {
        const x = Math.round((Math.random() * 100) - 10) + '%';
        const y = Math.round(Math.random() * 100) + '%';
        return [x, y];
    }
    setInterval(generateLocks, interval);
    generateLocks();

    return (
        <>
            <div className='forbidden-container'>
                <div className="forbidden-mini-container">
                    <h1>4<div className="lock"><div className="top"></div><div className="bottom"></div>
                    </div>3</h1><p>Access denied</p>
                </div>
            </div>
        </>
    )
}
