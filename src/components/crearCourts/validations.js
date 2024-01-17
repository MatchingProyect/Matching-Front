const validar = (datos) => {
    let errores = {
        name: null,
        description: null,
        priceFee: null,
        warrantyReservation: null,
        grassType: null,
        lighting: null,
        doorsType: null,
        wallsType: null,
        reputation: null,
        imgClub: null,
        horarioInicio: null,
        horarioCierre: null,
        ClubId: null,
        SportId: null,
        LocationId: null
    };

    if (datos.name.trim().length === 0) {
        errores.name = 'El nombre no puede estar vacío';
    } else if (datos.name.length > 20) {
        errores.name = 'El nombre no puede tener más de 20 caracteres';
    }

    if (datos.description.trim().length === 0) {
        errores.description = 'La descripción no puede estar vacía';
    } else if (datos.description.length > 20) {
        errores.description = 'La descripción no puede tener más de 20 caracteres';
    }

    if (datos.warrantyReservation.trim().length === 0) {
        errores.warrantyReservation = 'La garantía de reserva no puede estar vacía';
    } else if (datos.warrantyReservation.length > 20) {
        errores.warrantyReservation = 'La garantía de reserva no puede tener más de 20 caracteres';
    }
    if (datos.grassType.trim().length === 0) {
        errores.grassType = 'El tipo de césped no puede estar vacío';
    } else if (datos.grassType.length > 20) {
        errores.grassType = 'El tipo de césped no puede tener más de 20 caracteres';
    }

    if (datos.lighting.trim().length === 0) {
        errores.lighting = 'La iluminación no puede estar vacía';
    } else if (datos.lighting.length > 20) {
        errores.lighting = 'La iluminación no puede tener más de 20 caracteres';
    }

    if (datos.doorsType.trim().length === 0) {
        errores.doorsType = 'El tipo de puertas no puede estar vacío';
    } else if (datos.doorsType.length > 20) {
        errores.doorsType = 'El tipo de puertas no puede tener más de 20 caracteres';
    }

    if (datos.wallsType.trim().length === 0) {
        errores.wallsType = 'El tipo de paredes no puede estar vacío';
    } else if (datos.wallsType.length > 20) {
        errores.wallsType = 'El tipo de paredes no puede tener más de 20 caracteres';
    }

    if (datos.reputation.trim().length === 0) {
        errores.reputation = 'La reputación no puede estar vacía';
    } else if (datos.reputation.length > 20) {
        errores.reputation = 'La reputación no puede tener más de 20 caracteres';
    }

    // Validaciones para la imagen
    if (!/\.(jpeg|jpg|png|gif|webp|bmp|svg)$/i.test(datos.imgClub)) {
        errores.imgClub = 'La imagen debe ser una URL de formato válido (JPEG, JPG, PNG, GIF, WEBP, BMP, SVG)';
    }

    // Validaciones para el precioCuota
    if (datos.priceFee.length === 0) {
        errores.priceFee = 'El precio no puede ser $0.'
    } else if (!Number(datos.priceFee)) {
        errores.priceFee = 'El precio debe ser un formato numérico.'
    }
    if(!datos.horarioInicio) errores.horarioInicio = 'La cancha debe tener un horario de inicio.'
    if(!datos.horarioCierre) errores.horarioCierre = 'La cancha debe tener un horario de cierre.'

    if(datos.ClubId.length === 0) errores.ClubId = 'La cancha debe estar asociada a un club.'
    if(datos.SportId.length === 0) errores.SportId = 'La cancha debe estar asociada a un deporte.'
    if(datos.LocationId.length === 0) errores.LocationId = 'La cancha debe estar asociada a una ubicación.'
    
    return errores;
}

export default validar;
