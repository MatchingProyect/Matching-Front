import axios from 'axios';
import React from 'react'

const crearReserva = ({reserva, setReserva, court}) => {

    const id = court.id

    if(!reserva) return null

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();


    const onSubmit = async(data) =>{
        try {
            await axios.post(`/reservations/${id}`, data)
            
        } catch (error) {
            return error.message
        }
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>dateTimeStart:</label>
                <input type="text" {...register('dateTimeStart', {required: true, maxLength: 20})}/>
                {errors.dateTimeStart?.type === "required" && <p>This field is required</p>}
                {errors.dateTimeStart?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
            <div>
                <label>dateTimeEnd:</label>
                <input type="text" {...register('dateTimeEnd', {required: true, maxLength: 20})}/>
                {errors.dateTimeEnd?.type === "required" && <p>This field is required</p>}
                {errors.dateTimeEnd?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
            <div>
                <label>totalCost:</label>
                <input type="text" {...register('totalCost', {required: true, maxLength: 20})}/>
                {errors.totalCost?.type === "required" && <p>This field is required</p>}
                {errors.totalCost?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
         <button type="submit" value='enviar'> Enviar </button>
        </form>
    )
}

export default crearReserva