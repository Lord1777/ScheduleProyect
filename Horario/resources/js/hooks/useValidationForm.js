import React from 'react'

const useValidationForm = () => {

    const NOMBRE = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        minLength: {
            value: 2,
            message: "El Nombre debe tener al menos 2 caracteres",
        },
        maxLength: {
            value: 30,
            message: "El Nombre no puede tener más de 30 caracteres",
        },
    }

    const PASSWORD = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        minLength: {
            value: 8,
            message: "Minimo 8 digitos",
        },
    }

    const TIPO_DOCUMENTO = {
        required: {
            value: true,
            message: "Es requerido este campo",
        },
    }

    const DOCUMENTO = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        minLength: {
            value: 7,
            message: "El documento debe tener al menos 7 dígitos",
        },
        maxLength: {
            value: 10,
            message: "El documento no puede tener más de 10 dígitos",
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "El documento debe contener solo números",
        },
    }

    const EMAIL = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "El Email no es válido",
        }
    }

    const NFICHA = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        pattern: {
            value: /^[0-9]*$/,
            message: "Solo se permiten números"
        },
    }
    
    const DURACION = {
        required: {
            value: true,
            message: "Es requerido este campo"
        }
    }

    const PROGRAMA = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
        pattern: {
            value: /^[A-Za-z]+$/,
            message: "Solo se permiten letras en el nombre",
        },
    }

    const MODALIDAD = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
    }

    const NIVEL_FORMACION = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
    }

    const JORNADA_ACADEMICA = {
        required: {
            value: true,
            message: "Es requerido este campo"
        },
    }

    return {
        NOMBRE,
        PASSWORD,
        TIPO_DOCUMENTO,
        DOCUMENTO,
        EMAIL,
        NFICHA,
        DURACION,
        PROGRAMA,
        MODALIDAD,
        NIVEL_FORMACION,
        JORNADA_ACADEMICA
    }
}

export default useValidationForm