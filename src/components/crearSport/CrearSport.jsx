import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import styles from './CrearSport.module.css';

const CrearSport = ({crearSport, setCrearSport}) => {

    if(!crearSport) return null

    const dispatch = useDispatch();


    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const onSubmitSports = async (data) => {
        try {
            const endPoint = '/sports'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchSports());
            }            
        } catch (error) {
            throw error.message;
        }
    }

  return (
    <div className = {styles.holeCompContainer}>
    <form onSubmit={handleSubmit(onSubmitSports)} className = {styles.formContainer}>
        <label className = {styles.label}>Name</label>
        <input className = {styles.input} type="text" {...register('name', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
    <button className = {styles.btnSubmit} type="submit" value='enviar'> Create </button>
    </form>
    <button onClick={()=> setCrearSport(false)} className = {styles.close} >Cerrar</button>
    </div>
  )
}

export default CrearSport