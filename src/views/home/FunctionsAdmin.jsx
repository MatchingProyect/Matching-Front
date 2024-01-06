import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import CardUser from "../cardUsers/CardUser";
import { Link } from "react-router-dom";

const FunctionsAdmin = () => {


    const [usersDeshabilitados, setUsersDeshabilitados] = useState(false)
    const [location, setLocation] = useState([])

    const {
        handleSubmit,
        formState: { errors },
        register
    } = useForm();

    const users = useSelector((state) => state.user.allUsers);
     const userLogeado =useSelector((state) =>state.user.user.user)
    const sports = useSelector((state) => state.user.allSports);
     const clubs = useSelector((state) => state.user.allClubs);
     const courts = useSelector((state) => state.user.allCourts);

    const dispatch = useDispatch();

    if(!userLogeado?.admin) return null

    

    useEffect(()=>{
        const fetchData = async()=>{
            const allLocations = await axios('/locations')
            if(allLocations)setLocation(allLocations.allLocations)
        }
    fetchData()
    })

    const onSubmitSports = async (data) => {
        try {
            const endPoint = '/sports'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchSports());
            }

            console.log('este tmb')
            
        } catch (error) {
            throw error.message;
        }
    }

    const onSubmitClubs = async (data) => {
        try {
            const endPoint = '/clubs'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchClubs());
            }
            console.log('tmb funk')
        } catch (error) {
            throw error.message;
        }
    }


    const onSubmitCourts = async (data) => {
        try {
            const endPoint = '/courts'
            const response = await axios.post(endPoint, data)
            if (response.status) {
                 dispatch(fetchCourts());
            }

            console.log('funk')
            
        } catch (error) {
            throw error.message;
        }
    }





    return(

//Sports
        <div>
            <div>
                <div>
                    {usersDeshabilitados === true && users?.filter(user => user.estado === false) 
    .map(filteredUser => (
        <CardUser user={filteredUser} />
    ))
                    }
                    <button onClick={()=> setUsersDeshabilitados(true)}>Mostrar usuarios deshabilitados</button>
                </div>
                <div>
                    <button>Mostrar canchas deshabilitadas</button>
                </div>
                <div>
                    <button>Mostrar clubes deshabilitados</button>
                </div>
            </div>
        <form onSubmit={handleSubmit(onSubmitSports)}>
            <div>
                <label>Name:</label>
                <input type="text" {...register('name', {required: true, maxLength: 20})}/>
                {errors.name?.type === "required" && <p>This field is required</p>}
                {errors.name?.type === "maxLength" && <p>The max in the field is 20 characters</p>}
            </div>
         <button type="submit" value='enviar'> Create </button>
        </form>

//Clubs

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

//Courts

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
        <Link to='/home'><button>x</button></Link>
        </div>
    )
}

export default FunctionsAdmin;