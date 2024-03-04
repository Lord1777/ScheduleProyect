import React from 'react'
import '../select/select.css'

export const Select = () => {
    return (
        <>
            <div className="container__select">
                <div className="select_add">
                    <select
                        name="talla"
                        id="add_talla"
                    >
                        <option value="" selected disabled>
                            Seleccionar Talla
                        </option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="Xl">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        </>
    )
}
