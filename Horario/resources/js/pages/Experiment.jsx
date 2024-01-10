import React, { useState } from 'react'

export const Experiment = () => {

    //Creando el login mediante este componente de pruebas
    //No te asustes si no sabes que es esto D:
    //Tampoco me lo borre paisano

    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                documento,
                password
            })
        });

        const content = await response.json();
        console.log(content);
    }



        return (
            <>
                <form onSubmit={handleSubmit}>

                    {/* <input
                        type="text"
                        className='textBox'
                        name=''
                        placeholder='Tipo de Documento'
                        readOnly
                    /> */}
                    <input
                        type="number"
                        name="documento"
                        placeholder='Número Documento'
                        onChange={(e) => setDocumento(e.target.value)}

                    />
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder='Contraseña'
                    />

                    <button type="submit">Ingresar</button>
                </form>

            </>
        )
}
