import React from 'react'

export const ScheduleComparationInstructor = () => {
    
    return (
        <>
            <div className="contenedor-horario">

                <div className="item-horario">Hor</div>
                <div className="item-horario">Lun</div>
                <div className="item-horario">Mar</div>
                <div className="item-horario">Mie</div>
                <div className="item-horario">Jue</div>
                <div className="item-horario">Vie</div>
                <div className="item-horario">Sab</div>
                <div className="item-horario">Dom</div>

                {Array.from({ length: 16 }, (_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="hora-horario">
                            <span>{`${6 + rowIndex}:00`}</span>
                            <span>{`${7 + rowIndex}:00`}</span>
                        </div>
                        {Array.from({ length: 7 }, (_, colIndex) => {

                            return (
                                <div
                                    className='cuadriculaHorario'
                                    key={colIndex}>
                                </div>
                            )

                        })}

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
