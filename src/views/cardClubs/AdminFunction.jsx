import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchClubs} from "../../redux/reducer";
import { useForm } from 'react-hook-form';

const AdminFunction = ({club, setEditClub, editClub}) => {

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

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


    const onSubmitClubs = async() =>{
        try {
            const endPoint =  `/clubs/${club.id}`
            const response = await axios.put(endPoint, data)
            if(response.status){
                dispatch(fetchClubs())
                setEditClub(false)
                
            }else{
                alert(response.message)
            }
            
        } catch (error) {
            alert(error.message)
        }
    }



    if(!editClub) return null

  return (
    <form onSubmit={handleSubmit(onSubmitClubs)}>
    <div>
        <label>Name:</label>
        <input type="text" {...register('name', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>Showers:</label>
        <input type="text" {...register('showers', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>Grills:</label>
        <input type="text" {...register('grills', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>Parking:</label>
        <input type="text" {...register('parking', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
        <label>Security:</label>
        <input type="text" {...register('security', {required: true, maxLength: 20})}/>
        {errors.name?.type === "required" && <p>This field is required</p>}
        {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
    </div>
 <button type="submit" value='enviar'> Create </button>
</form>
  )
}

export default AdminFunction