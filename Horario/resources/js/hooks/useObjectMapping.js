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

export const getLimiteHorasByIdContrato = (id) =>{
    const limiteHoras = {
        2: 35,
        1: 40,
    }
    return limiteHoras[id]
}

