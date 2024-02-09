 //Funcion para sacar las iniciales del instructor (nombre)
export const initialsName = (nombreCompleto) => {
    console.log(nombreCompleto);
    const words = nombreCompleto.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join('');
}