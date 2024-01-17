const validar = (datos) => {
    let errores = {
        teamMatch: null,
    };

    if (datos.teamMatch.trim().length === 0) {
        errores.teamMatch = 'El equipo debe tener un nombre.';
    } else if (datos.teamMatch.length > 20) {
        errores.teamMatch = 'El nombre no puede tener más de 20 caracteres';
    }
   
    return errores;
}

export default validar;
