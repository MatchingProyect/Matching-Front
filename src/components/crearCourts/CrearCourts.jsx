import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './CrearCourts.module.css';


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
    <div className = {styles.holeCompContainer}>
        <form onSubmit={handleSubmit(onSubmitCourts)} className = {styles.formContainer}>
        <div className = {styles.inputContainer}>
                
                <input type="text" {...register('name', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Name</label>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('description', {required: true, maxLength: 100})} className = {styles.input}/>
                <label className = {styles.label}>Description</label>
                {errors.description?.type === "required" && <p>This field is required</p>}
                {errors.description?.type === "maxLength" && <p>The max in the field is 100 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('pricefee', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>PriceFee</label>
                {errors.pricefee?.type === "required" && <p>This field is required</p>}
                {errors.pricefee?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('warranty', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Warranty</label>
                {errors.warranty?.type === "required" && <p>This field is required</p>}
                {errors.warranty?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('grasstype', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>GrassType</label>
                {errors.grasstype?.type === "required" && <p>This field is required</p>}
                {errors.grasstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('lighting', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>Lighting</label>
                {errors.lighting?.type === "required" && <p>This field is required</p>}
                {errors.lighting?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('doorstype', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>DoorsType</label>
                {errors.doorstype?.type === "required" && <p>This field is required</p>}
                {errors.doorstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('wallstype', {required: true, maxLength: 20})} className = {styles.input}/>
                <label className = {styles.label}>WallsType</label>
                {errors.wallstype?.type === "required" && <p>This field is required</p>}
                {errors.wallstype?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
                <input type="text" {...register('reputation', {required: true, maxLength: 100})} className = {styles.input}/>
                <label className = {styles.label}>Reputation</label>
                {errors.reputation?.type === "required" && <p>This field is required</p>}
                {errors.reputation?.type === "maxLength" && <p>The max in the field is 100 characters</p>}
                </div>
                <div className = {styles.inputContainer}>
                
      <select id="clubSelect" className = {styles.input}>
        {clubs?.map(club => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
      <label htmlFor="clubSelect" className = {styles.label}>Club</label>
      </div>
      <div className = {styles.inputContainer}>

      
      <select id="sportSelect" className = {styles.input}>
        {sports?.map(sport => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
      <label htmlFor="sportSelect" className = {styles.label}>Sport</label>
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
         <button type="submit" value='enviar' className = {styles.btnSubmit}>Create</button>
        </form>
        <button onClick={()=>setCrearCourt(false)} className = {styles.close}>Cerrar</button>
    </div>
  )
}

export default CrearCourts