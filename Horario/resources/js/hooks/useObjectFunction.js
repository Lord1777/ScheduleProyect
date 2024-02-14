 //Funcion para sacar las iniciales del instructor (nombre)
export const initialsName = (nombreCompleto) => {
    if(typeof nombreCompleto === 'string'){
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
    }else {
        return '';
    }

}