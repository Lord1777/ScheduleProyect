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
    if (typeof fecha === 'string') {
        var partesFecha = fecha.split('-');
        var nuevaFecha = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];
        return nuevaFecha;
    } else {
        return '';
    }

}

export const getAñoByDate = (fecha) => {
    if (typeof fecha === 'string') {
        const partesFecha = fecha.split('-');
        const año = partesFecha[0];
        return parseInt(año);
    } else {
        return '';
    }
}

export const generateRandomColors = (length) => {

    if (typeof length === 'number') {
        const colors = [];

        //Colores pastel
        const allColors = [
            "#58D68D",
             "#FFD1DC",
              "#FFDAB9",
               "#B0E0E6",
                "#E6E6FA",
                 "#F5F5F5",
                  "#7FFFD4",
                   "#FFF8DC",
                    "#AFEEEE",
                     "#E0EEE0",
                      "#F08080",
                       "#FA8072",
                        "#D8BFD8",
                         "#98FF98",
                          "#ADD8E6",
                           "#AFEEEE",
                            "#FFD700",
                             "#F5F5DC",
                              "#E0FFFF",
                               "#89CFF0",
                                "#FFE4B5",
                                 "#FFC0CB",
                                  "#fabfb7",
                                   "#c5c6c8",
                                    "#fdfd96",
                                     "#d3bcf6"
                                    
        ];

        let lastColorIndex = -1;
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * allColors.length);
            while (randomIndex === lastColorIndex) {
                randomIndex = Math.floor(Math.random() * allColors.length);
            }
            colors.push(allColors[randomIndex]);
            lastColorIndex = randomIndex;
        }
        return colors;
    }else {
        return [];
    }
};