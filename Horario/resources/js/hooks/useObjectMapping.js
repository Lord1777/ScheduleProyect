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

