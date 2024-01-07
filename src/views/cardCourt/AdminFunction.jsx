import React, { useEffect } from 'react'
import { fetchCourts } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

    

    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         try {
    //             const {data} = await axios(`/court/${court.id}`)
    //             if(data.status){
    //                 reset({
    //                    name: data.court.name,
    //                    description: data.court.description,
    //                    priceFee: data.court.priceFee,
    //                    warrantyReservation: data.court.warrantyReservation,
    //                    grassType: data.court.grassType,
    //                    lighting: data.court.lighting,
    //                    doorsType: data.court.doorsType,wallsType: data.court.wallsType,
    //                    reputation: data.court.reputation
    //                 })
    //             }
             
    //         } catch (error) {
    //             return error.message
    //         }
    //         }
    //     fetchData()
    // }, [])

   


    const onSubmitCourt = async() =>{
        try {
            const endPoint =  `/court/${court.id}`
            const response = await axios.put(endPoint, data)
            if(response.status){
                dispatch(fetchCourts())
                setUpdate(false)
                
            }else{
                alert(response.message)
            }
            
        } catch (error) {
            alert(error.message)
        }
    }



    if(!update) return null

  return (
    <form onSubmit={handleSubmit(onSubmitCourt)}>
    <div>
        <label>Name:</label>
        <input type="text" {...register('name', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>description:</label>
        <input type="text" {...register('description', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>priceFee:</label>
        <input type="text" {...register('priceFee', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>warrantyReservation:</label>
        <input type="text" {...register('warrantyReservation', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>grassType:</label>
        <input type="text" {...register('grassType', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>lighting:</label>
        <input type="text" {...register('lighting', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>doorsType:</label>
        <input type="text" {...register('doorsType', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>wallsType:</label>
        <input type="text" {...register('wallsType', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>reputation:</label>
        <input type="text" {...register('reputation', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}


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
  )

}

export default AdminFunction