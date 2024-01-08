import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const CrearCourts = ({crearCourt, setCrearCourt}) => {

    const sports = useSelector((state) => state.user.allSports);
     const clubs = useSelector((state) => state.user.allClubs);
     const location = useSelector((state) => state.user.allLocations);

    

     const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const dispatch = useDispatch();

    const onSubmitCourts = async (data) => {
        try {
            const endPoint = '/courts'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchCourts());
            }

            
            
        } catch (error) {
            throw error.message;
        }
    }

    if(!crearCourt) return null

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmitCourts)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Description:</label>
                <input type="text" {...register('description', {required: true, maxLength: 100})}/>
                {errors.description?.type === "required" && <p>This field is required</p>}
                {errors.description?.type === "maxLength" && <p>The max in the field is 100 characters</p>}
                <label>PriceFee:</label>
                <input type="text" {...register('pricefee', {required: true, maxLength: 20})}/>
                {errors.pricefee?.type === "required" && <p>This field is required</p>}
                {errors.pricefee?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>WarrantyReservation:</label>
                <input type="text" {...register('warranty', {required: true, maxLength: 20})}/>
                {errors.warranty?.type === "required" && <p>This field is required</p>}
                {errors.warranty?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>GrassType:</label>
                <input type="text" {...register('grasstype', {required: true, maxLength: 20})}/>
                {errors.grasstype?.type === "required" && <p>This field is required</p>}
                {errors.grasstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Lighting:</label>
                <input type="text" {...register('lighting', {required: true, maxLength: 20})}/>
                {errors.lighting?.type === "required" && <p>This field is required</p>}
                {errors.lighting?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>DoorsType:</label>
                <input type="text" {...register('doorstype', {required: true, maxLength: 20})}/>
                {errors.doorstype?.type === "required" && <p>This field is required</p>}
                {errors.doorstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>WallsType:</label>
                <input type="text" {...register('wallstype', {required: true, maxLength: 20})}/>
                {errors.wallstype?.type === "required" && <p>This field is required</p>}
                {errors.wallstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Reputation:</label>
                <input type="text" {...register('reputation', {required: true, maxLength: 100})}/>
                {errors.reputation?.type === "required" && <p>This field is required</p>}
                {errors.reputation?.type === "maxLength" && <p>The max in the field is 100 characters</p>}

                <label htmlFor="clubSelect">Select Club:</label>
      <select id="clubSelect">
        {clubs?.map(club => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>

      <label htmlFor="sportSelect">Select Sport:</label>
      <select id="sportSelect">
        {sports?.map(sport => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>

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
        <button onClick={()=>setCrearCourt(false)}>cerrar</button>
    </div>
  )
}

export default CrearCourts