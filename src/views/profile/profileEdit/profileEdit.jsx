import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfiles } from '../../../redux/reducer';


export default function ProfileEdit(){

    const {register, formState: {errors} , handleSubmit, reset} = useForm();

    const {id} = useParams()

    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const {data} = await axios(`/profiles/${id}`)
                if(data.status){
                    reset({
                        laterality: data.profileFound.laterality,
                        courtSide: data.profileFound.courtSide,
                        matchType: data.profileFound.matchType,
                        dayPreference:  data.profileFound.dayPreference,
                        timePreference:  data.profileFound.timePreference,
                        categoryLvl: data.profileFound.categoryLvl
                    })
                }
             
            } catch (error) {
                return error.message
            }
            }
        fetchData()
    },[])

    const onSubmit = async(data)=>{
        try {
            const endPoint =  `/profiles/${id}`
            const response = await axios.put(endPoint, data)
            if(response.status){
                dispatch(fetchProfiles());
                
            }else{
                alert(response.message)
            }
            
        } catch (error) {
            alert(error.message)
        }
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>laterality:</label>
                <input type="text" {...register('laterality', {required: true, maxLength: 20})}/>
                {errors.laterality?.type === "required" && <p>This field is required</p>}
                {errors.laterality?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
            <div>
                <label>courtSide:</label>
                <input type="text"  {...register('courtSide', {required: true})} />
                {errors.courtSide?.type  === "required" && <p>This field is required</p>}
            </div>
            <div>
                <label>matchType:</label>
                <input type="text"  {...register('matchType', {required: true})} />
                {errors.matchType?.type  === "required" && <p>This field is required</p>}
            </div>
            <div>
                <label>dayPreference:</label>
                <input type="text"  {...register('dayPreference', {required: true})} />
                {errors.dayPreference?.type  === "required" && <p>This field is required</p>}
            </div>
            <div>
                <label>timePreference:</label>
                <input type="text"  {...register('timePreference', {required: true})} />
                {errors.timePreference?.type  === "required" && <p>This field is required</p>}
            </div>
            <div>
                <label>categoryLvl:</label>
                <input type="text"  {...register('categoryLvl', {required: true})} />
                {errors.categoryLvl?.type  === "required" && <p>This field is required</p>}
            </div>
            <button type="submit" value='enviar'> Enviar </button>
        </form>
    )
}