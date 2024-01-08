import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import CardUser from "../cardUsers/CardUser";
import { Link } from "react-router-dom";
import CardClub from "../cardClubs/CardClub";
import CardCourt from "../cardCourt/CardCourt";
import { fetchCourts, fetchUsers } from "../../redux/reducer";
import CrearSport from "../../components/crearSport/CrearSport";
import CrearClub from "../../components/crearClub/CrearClub";
import CrearCourts from "../../components/crearCourts/CrearCourts";

const FunctionsAdmin = () => {


    const [usersDeshabilitados, setUsersDeshabilitados] = useState(false)
    const [clubDeshabilitados, setClubsDeshabilitados] = useState(false)
    const [courtsDeshabilitados, setCourtsDeshabilitados] = useState(false)
    const [crearSport, setCrearSport] = useState(false)
    const [crearClub, setCrearClub] = useState(false)
    const [crearCourt, setCrearCourt] = useState(false)
   

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
     const location = useSelector((state) => state.user.allLocations);


    const dispatch = useDispatch();

    if(!userLogeado?.admin) return null

    

    


   

    const reactivarClub = async(id) =>{
      try {
        const deleted = await axios.put(`/clubEstado/${id}`, {estado: true});
        if(deleted.status)  dispatch(fetchClubs());
      } catch (error) {
        alert(error.message)
      }
    }

    const reactivarCourt = async(id) =>{
      try {
        const deleted = await axios.put(`/courtEstado/${id}`, {estado: true});
        if(deleted.status)  dispatch(fetchCourts());
      } catch (error) {
        alert(error.message)
      }
    }


    return(

//Sports
        <div>
            <div>
                <div>
                    {usersDeshabilitados === true && users?.filter(user => user.estado === false) 
                      .map(filteredUser => (
                        <div key={filteredUser.id}>
                        <CardUser user={filteredUser} />
                        
                        
                    </div>
                      ))
                    }
                    {usersDeshabilitados === false ? <button onClick={()=> setUsersDeshabilitados(true)}>Mostrar usuarios deshabilitados</button> : <button onClick={()=> setUsersDeshabilitados(false)}>ocultar usuarios deshabilitados</button>}
                    
                </div>
                <div>
                {courtsDeshabilitados === true && courts?.filter(court => court.estado === false) 
                      .map(filteredCourt => (
                          <div key={filteredCourt.id}>
                              <CardCourt court={filteredCourt} />
                              
                          </div>
                ))}
                    {courtsDeshabilitados === false ? <button onClick={()=> setCourtsDeshabilitados(true)}>Mostrar courts deshabilitados</button> : <button onClick={()=> setCourtsDeshabilitados(false)}>ocultar courts deshabilitados</button>}
                </div>
                <div>
                {clubDeshabilitados === true && clubs?.filter(club => club.estado === false) 
                      .map(filteredClub => (
                          <div key={filteredClub.id}>
                              <CardClub club={filteredClub} />
                              <button onClick={()=> reactivarClub(filteredClub.id)} >Activar Club</button>
                          </div>
                ))}
                    {clubDeshabilitados === false ? <button onClick={()=> setClubsDeshabilitados(true)}>Mostrar clubs deshabilitados</button> : <button onClick={()=> setClubsDeshabilitados(false)}>ocultar clubs deshabilitados</button>}
                </div>
            </div>
      <button onClick={()=> setCrearSport(true)}>crear Sport</button>
      <CrearSport crearSport={crearSport} setCrearSport={setCrearSport} />

//Clubs
      
        <button onClick={()=>setCrearClub(true)}>crear Club</button>
        <CrearClub setCrearClub={setCrearClub} crearClub={crearClub} />

//Courts
        <button onClick={()=>setCrearCourt(true)}>crear courts</button>
        <CrearCourts setCrearCourt={setCrearCourt} crearCourt={crearCourt} />


        
        <Link to='/home'><button>x</button></Link>
        </div>
    )
}

export default FunctionsAdmin;