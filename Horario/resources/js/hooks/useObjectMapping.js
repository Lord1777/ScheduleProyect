export const getSedeByName = (name) =>{
    const sedes = {
        industrial: 1,
        cbi: 2,
        ambos: 3,
    }
    return sedes[name]
}

export const getContratoByName = (name) =>{
    const contratos = {
        planta: 1,
        contratista: 2,
    }
    return contratos[name]
}

export const getNivelDeFormacionByName = (name) =>{
    const niveles = {
        Tecnico: 1,
        Tecnologo: 2,
        tecnico: 1,
        tecnologo: 2,
    }
    return niveles[name]
}

export const getModalidadByName = (name) =>{
    const modalidad = {
        virtual: 1,
        Presencial: 2,
        complementaria: 3,
        Virtual: 1, 
        presencial: 2,
        Complementaria: 3,
    }
    return modalidad[name]
}

export const getJornadaByName = (name) =>{
    const jornada = {
        diurna: 1,
        nocturna: 2,
        Diurna: 1,
        Nocturna: 2,
    }
    return jornada[name]
}

export const getRolByName = (name) => {
    const roles = {
        coordinador: 1,
        instructor: 2,
    }
    return roles[name]
}

export const getLimiteHorasByTypeContrato = (string) =>{
    const limiteHoras = {
        contratista: 35,
        planta: 40,
    }
    return limiteHoras[string]
}

export const getTrueOrFalseByYesOrNot = ( string ) =>{
    const boolean = {
        Si: 1,
        No: 0,
    }
    return boolean[string]
}

export const getYesOrNotByNumber = ( number ) => {
    const boolean = {
        1: Si,
        0: No,
    }

    return boolean [ number ]

}