import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSports, fetchClubs, fetchCourts } from "../../redux/reducer";
import { useForm } from 'react-hook-form';

const FunctionsAdmin = ({admTrue, setAdmTrue}) => {

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const dispatch = useDispatch();

    if(!admTrue) return null

    console.log(admTrue)

    const onSubmitSports = async (data) => {
        try {
            //const endPoint = '/sports'
            // const response = await axios.post(endPoint, data)
            // if (response.status) {
            //      dispatch(fetchSports());
            // }

            console.log('este tmb')
            
        } catch (error) {
            throw error.message;
        }
    }

    const onSubmitClubs = async (data) => {
        try {
            // const endPoint = '/clubs'
            // const response = await axios.post(endPoint, data)
            // if (response.status) {
            //      dispatch(fetchClubs());
            // }
            console.log('tmb funk')
        } catch (error) {
            throw error.message;
        }
    }


    const onSubmitCourts = async (data) => {
        try {
            // const endPoint = '/courts'
            // const response = await axios.post(endPoint, data)
            // if (response.status) {
            //      dispatch(fetchCourts());
            // }

            console.log('funk')
            
        } catch (error) {
            throw error.message;
        }
    }

    return(
        <div>
        <form onSubmit={handleSubmit(onSubmitSports)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
         <button type="submit" value='enviar'> Create </button>
        </form>

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

        <form onSubmit={handleSubmit(onSubmitCourts)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Description:</label>
                <input type="text" {...register('description', {required: true, maxLength: 100})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 100 characters</p>}
                <label>PriceFee:</label>
                <input type="text" {...register('pricefee', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>WarrantyReservation:</label>
                <input type="text" {...register('warranty', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>GrassType:</label>
                <input type="text" {...register('grasstype', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Lighting:</label>
                <input type="text" {...register('lighting', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>DoorsType:</label>
                <input type="text" {...register('doorstype', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>WallsType:</label>
                <input type="text" {...register('wallstype', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
                <label>Reputation:</label>
                <input type="text" {...register('reputation', {required: true, maxLength: 100})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 100 characters</p>}
            </div>
         <button type="submit" value='enviar'> Create </button>
        </form>
        <button onClick={setAdmTrue(false)}>x</button>
        </div>
    )
}

export default FunctionsAdmin;