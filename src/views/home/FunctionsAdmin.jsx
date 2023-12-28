import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSports } from "../../redux/reducer";
import { useForm } from 'react-hook-form';

const FunctionsAdmin = () => {

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const endPoint = '/sports'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchSports());
            }
            
        } catch (error) {
            
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
         <button type="submit" value='enviar'> Enviar </button>
        </form>
    )
}

export default FunctionsAdmin;