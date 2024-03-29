import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubs} from "../../redux/reducer";
import { useForm } from 'react-hook-form';
import styles from './AdminFunction.module.css';

const AdminFunction = ({club, setEditClub, editClub}) => {

    

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const locations = useSelector((state) => state.user.allLocations);

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const {data} = await axios(`/clubs/${club.id}`)
                if(data.status){
                    reset({
                       name: data.clubs.name,
                       showers: data.clubs.showers,
                       grills: data.clubs.grills,
                       parking: data.clubs.parking,
                       security: data.clubs.security
                    })
                }
             
            } catch (error) {
                return error.message
            }
            }
        fetchData()
    }, [])

  


    const onSubmitClubs = async (formData) => {
      try {
          const endPoint = `/clubs/${club.id}`;
          const response = await axios.put(endPoint, formData);
          if (response.status) {
              dispatch(fetchClubs());
              setEditClub(false);
          } else {
              alert(response.message);
          }
      } catch (error) {
          alert(error.message);
      }
  };



    if(!editClub) return null

  return (
    <form onSubmit={handleSubmit(onSubmitClubs)} className = {styles.holeModal}>
    <div className = {styles.holeComp}>
    <div className={styles.modalHeader}>
                    <label className={styles.labelTop}>Editar {club.name}</label>
                    <button onClick={()=>{setEditClub(false)}} className={styles.closeBtn}>x</button>
                </div>
    <div className={styles.modalContainer}>
      <div className = {styles.inputsModal}>
        <label>Name:</label>
        <input type="text" {...register('name', {required: true, maxLength: 20})}/>
        </div>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.inputsModal}>
        <label>Showers:</label>
        <input type="text" {...register('showers', {required: true, maxLength: 20})}/>
        </div>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.inputsModal}>
        <label>Grills:</label>
        <input type="text" {...register('grills', {required: true, maxLength: 20})}/>
        </div>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.inputsModal}>
        <label>Parking:</label>
        <input type="text" {...register('parking', {required: true, maxLength: 20})}/>
        </div>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        </div>
        <div className={styles.modalContainer}>
        <div className = {styles.inputsModal}>
        <label>Security:</label>
        <input type="text" {...register('security', {required: true, maxLength: 20})}/>
        </div>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        </div>
        <div className={styles.modalContainer}>
        <label htmlFor="locationSelect">Select Location:</label>
      <select id="locationSelect">
        {locations?.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      </div>
      <button type="submit" value='enviar' className={styles.createBtn}> Actualizar </button>
    </div>
 
</form>
  )
}

export default AdminFunction