import React from 'react'

const crearReserva = ({reserva, setReserva, court}) => {

    if(!reserva) return null

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

   


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
         <button type="submit" value='enviar'> Enviar </button>
        </form>
    )
}

export default crearReserva