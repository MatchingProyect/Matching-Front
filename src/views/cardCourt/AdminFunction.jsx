import React, { useEffect } from 'react'
import { fetchCourts } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './AdminFunction.module.css';

const AdminFunction = ({court, update, setUpdate}) => {

  
    const sports = useSelector((state) => state.user.allSports);
     const clubs = useSelector((state) => state.user.allClubs);
     const location = useSelector((state) => state.user.allLocations)
    
    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const dispatch = useDispatch();

    

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const {data} = await axios(`/court/${court.id}`)
                if(data.status){
                    reset({
                       name: data.court.name,
                       description: data.court.description,
                       priceFee: data.court.priceFee,
                       warrantyReservation: data.court.warrantyReservation,
                       grassType: data.court.grassType,
                       lighting: data.court.lighting,
                       doorsType: data.court.doorsType,wallsType: data.court.wallsType,
                       reputation: data.court.reputation
                    })
                }
             
            } catch (error) {
                return error.message
            }
            }
        fetchData()
    }, [])

   


    const onSubmitCourt = async (formData) => {
      try {
          const endPoint = `/courts/${court.id}`;
          const response = await axios.put(endPoint, formData); 
          if (response.status) {
              dispatch(fetchCourts());
              setUpdate(false);
          } else {
              alert(response.message);
          }
      } catch (error) {
        console.log(error); 
          alert(error.message);
      }
  };



    if(!update) return null

  return (
    <form onSubmit={handleSubmit(onSubmitCourt)} className = {styles.holeModalComp}>
    <div className = {styles.formBody}>
    <div className={styles.modalHeader}>
                    <label className={styles.labelTop}>Actualizar {court.name}</label>
                    <button className={styles.closeBtn} onClick={() => setUpdate(false)}>x</button>
                </div>
        <div className={styles.modalContainer}>
          <div className = {styles.formValores}>
        <label>Nombre</label>
        <input type="text" {...register('name', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}</div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Descripción</label>
        <input type="text" {...register('description', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Precio</label>
        <input type="text" {...register('priceFee', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Garantía</label>
        <input type="text" {...register('warrantyReservation', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Tipo de Grass</label>
        <input type="text" {...register('grassType', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Iluminación</label>
        <input type="text" {...register('lighting', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Puertas</label>
        <input type="text" {...register('doorsType', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Paredes</label>
        <input type="text" {...register('wallsType', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.formValores}>
        <label>Reputación</label>
        <input type="text" {...register('reputation', {required: true, maxLength: 20})}/>
        </div>
        <div className = {styles.divErros}>
        {errors.name?.type === "required" && <p className = {styles.pErrors}>This field is required</p>}
        {errors.name?.type === "maxLength" && <p className = {styles.pErrors}>The max in the field is 20 characters</p>}
        </div>
        </div>
        <div className={styles.modalContainer}>
        <label htmlFor="clubSelect">Club</label>
      <select id="clubSelect">
        {clubs?.map(club => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
      </div>
      <div className={styles.modalContainer}>
      <label htmlFor="sportSelect">Deporte</label>
      <select id="sportSelect">
        {sports?.map(sport => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
      </select>
      </div>
      <div className={styles.modalContainer}>
      <label htmlFor="locationSelect">Ubicación</label>
      <select id="locationSelect">
        {location?.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      </div>
      <button type="submit" value='enviar' className={styles.updateBtn}>Actualizar</button>
    </div>
</form>
  )

}

export default AdminFunction