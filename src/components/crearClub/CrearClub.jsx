import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import styles from './CrearClub.module.css';

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
    <div className = {styles.holeCompContainer}>
    <form onSubmit={handleSubmit(onSubmitClubs)} className = {styles.formContainer}>
      <div className = {styles.inputContainer}>
                
                <input type="text" {...register('name', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Name</label>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('showers', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Showers</label>
                {errors.showers?.type === "required" && <p>This field is required</p>}
                {errors.showers?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('grills', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Grills</label>
                {errors.grills?.type === "required" && <p>This field is required</p>}
                {errors.grills?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('parking', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Parking</label>
                {errors.parking?.type === "required" && <p>This field is required</p>}
                {errors.parking?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('security', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Security</label>
                {errors.security?.type === "required" && <p>This field is required</p>}
                {errors.security?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
      <select id="locationSelect" className = {styles.input}>
        {location?.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <label htmlFor="locationSelect" className = {styles.label}>Location</label>
      </div>
         <button type="submit" value='enviar' className = {styles.btnSubmit}> Create </button>
        </form>
        <button onClick={()=>setCrearClub(false)} className = {styles.close}>Cerrar</button>
        </div>
  )
}

export default CrearClub