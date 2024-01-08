import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios'

const CrearClub = ({crearClub, setCrearClub}) =>{ 
    const dispatch = useDispatch();

    if(!crearClub) return null

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const location = useSelector((state) => state.user.allLocations);

    const onSubmitClubs = async (data) => {
        try {
            const endPoint = '/clubs'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchClubs());
            }
           
        } catch (error) {
            throw error.message;
        }
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmitClubs)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Showers:</label>
                <input type="text" {...register('showers', {required: true, maxLength: 20})}/>
                {errors.showers?.type === "required" && <p>This field is required</p>}
                {errors.showers?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Grills:</label>
                <input type="text" {...register('grills', {required: true, maxLength: 20})}/>
                {errors.grills?.type === "required" && <p>This field is required</p>}
                {errors.grills?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Parking:</label>
                <input type="text" {...register('parking', {required: true, maxLength: 20})}/>
                {errors.parking?.type === "required" && <p>This field is required</p>}
                {errors.parking?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Security:</label>
                <input type="text" {...register('security', {required: true, maxLength: 20})}/>
                {errors.security?.type === "required" && <p>This field is required</p>}
                {errors.security?.type === "maxLength" && <p>The max in the field is 20 characters</p>}

                <label htmlFor="locationSelect">Select Location:</label>
      <select id="locationSelect">
        {location?.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
            </div>
         <button type="submit" value='enviar'> Create </button>
        </form>
        <button onClick={()=>setCrearClub(false)}>cerrar</button>
        </>
  )
}

export default CrearClub