//Funcion para sacar las iniciales del instructor (nombre)
export const initialsName = (nombreCompleto) => {
    if (typeof nombreCompleto === 'string') {
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
    } else {
        return '';
    }
}

//Cambiar del formato YY-MM-DD a DD-MM-YY
export const parseDate = (fecha) => {
    if (typeof fecha === 'string'){
        var partesFecha = fecha.split('-');
        var nuevaFecha = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];
        return nuevaFecha;
    } else{
        return '';
    }

}

export const getAñoByDate = (fecha) =>{
    if(typeof fecha === 'string'){
            const partesFecha = fecha.split('-');
            const año = partesFecha[0];
            return parseInt(año);
    }else {
        return '';
    }
}