import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from './useRequestOptionsGet';
import { getYesOrNotByNumber } from '../useObjectMapping';

const useFetchGetDetailsAmbiente = (id) => {

    const [ambiente, setAmbiente] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [mesas, setMesas] = useState(null);
    const [computadores, setComputadores] = useState(null);
    const [aireacondicionado, setAireacondicionado] = useState(null);
    const [videoBeam, setVideoBeam] = useState(null);
    const [sede, setSede] = useState(null);
    const [tablero, setTablero] = useState(null);

    const mapBooleanToYesOrNo = (value) => {
        return value ? 'Si' : 'No';
    };

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/getEnvironment/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((Data) => {
                    console.log(Data)
                    setAmbiente(Data.ambiente);
                    setCapacidad(Data.capacidad);
                    setMesas(Data.cantidadMesas);
                    setComputadores(Data.cantidadComputadores);
                    setSede(Data.sede);
                    setAireacondicionado(mapBooleanToYesOrNo(Data.aireAcondicionado));
                    setVideoBeam(mapBooleanToYesOrNo(Data.videoBeam));
                    setTablero(mapBooleanToYesOrNo(Data.tablero));

                    dropdown1.setSelectedOption(mapBooleanToYesOrNo(Data.aireAcondicionado));
                    dropdown2.setSelectedOption(mapBooleanToYesOrNo(Data.videoBeam));
                    dropdown3.setSelectedOption(Data.sede);
                    dropdown4.setSelectedOption(mapBooleanToYesOrNo(Data.tablero));
                })
                .catch((error) => {
                    console.error("Error al cargar los detalles del producto:", error);
                });
        }
    }, [id]);

    return {
        ambiente,
        setAmbiente,
        capacidad,
        setCapacidad,
        mesas,
        setMesas,
        computadores,
        setComputadores,
        aireacondicionado,
        setAireacondicionado,
        videoBeam,
        setVideoBeam,
        sede,
        setSede,
        tablero,
        setTablero
    };

};

export default useFetchGetDetailsAmbiente;
