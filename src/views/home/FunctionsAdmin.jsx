import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from './FunctionsAdmin.module.css';
import {  useState } from "react";
import CardUser from "../cardUsers/CardUser";
import CardClub from "../cardClubs/CardClub";
import CardCourt from "../cardCourt/CardCourt";
import { fetchClubs, fetchCourts } from "../../redux/reducer";
import CrearSport from "../../components/crearSport/CrearSport";
import CrearClub from "../../components/crearClub/CrearClub";
import CrearCourts from "../../components/crearCourts/CrearCourts";
import NavbarLow from "../../components/navbarLow/navbarLow";

const FunctionsAdmin = () => {
  
  const dispatch = useDispatch();
  const [usersDeshabilitados, setUsersDeshabilitados] = useState(false)
  const [courtsDeshabilitados, setCourtsDeshabilitados] = useState(false)
  const [clubDeshabilitados, setClubsDeshabilitados] = useState(false)
  const [crearSport, setCrearSport] = useState(false)
  const [crearClub, setCrearClub] = useState(false)
  const [crearCourt, setCrearCourt] = useState(false)


  const users = useSelector((state) => state.user?.allUsers);
  const userLogeado = useSelector((state) =>state.user?.datauser?.user);
  const location = useSelector((state) => state.user.allLocations);
  // const sports = useSelector((state) => state.user?.allSports);
  const courts = useSelector((state) => state.user?.allCourts);
  const clubs = useSelector((state) => state.user?.allClubs);
  // const location = useSelector((state) => state.user?.allLocations);
  
  
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
        <div className ={styles.holeContainer}>
            <div className = {styles.registrosDeshabilitados}>
                <div className = {styles.divDesabilitados}>
                    {usersDeshabilitados === true && users?.filter(user => user.estado === false) 
                      .map(filteredUser => (
                        <div key={filteredUser.id}>
                        <CardUser user={filteredUser} />
                        
                        
                    </div>
                      ))
                    }
                    {usersDeshabilitados === false ? <button className = {styles.btnDesabilitados} onClick={()=> setUsersDeshabilitados(true)}>Mostrar usuarios deshabilitados</button> : <button className = {styles.btnDesabilitados} onClick={()=> setUsersDeshabilitados(false)}>Ocultar users deshabilitados</button>}
                    
                </div>
                <div className = {styles.divDesabilitados}>
                {courtsDeshabilitados === true && courts?.filter(court => court.estado === false) 
                      .map(filteredCourt => (
                          <div key={filteredCourt.id} className = {styles.courtDivDesabilitadas}>
                              <CardCourt court={filteredCourt} />
                              <button onClick={()=> reactivarCourt(filteredCourt.id)} >Activar Court</button>
                              
                          </div>
                ))}
                    {courtsDeshabilitados === false ? <button className = {styles.btnDesabilitados} onClick={()=> setCourtsDeshabilitados(true)}>Mostrar courts deshabilitados</button> : <button className = {styles.btnDesabilitados} onClick={()=> setCourtsDeshabilitados(false)}>Ocultar courts deshabilitados</button>}
                </div>
                <div className = {styles.divDesabilitados}>
                {clubDeshabilitados === true && clubs?.filter(club => club.estado === false) 
                      .map(filteredClub => (
                          <div key={filteredClub.id} className = {styles.clubesDes}>
                              <CardClub club={filteredClub} />
                              <button onClick={()=> reactivarClub(filteredClub.id)} >Activar Club</button>
                          </div>
                ))}
                    {clubDeshabilitados === false ? <button className = {styles.btnDesabilitados} onClick={()=> setClubsDeshabilitados(true)}>Mostrar clubs deshabilitados</button> : <button className = {styles.btnDesabilitados} onClick={()=> setClubsDeshabilitados(false)}>Ocultar clubs deshabilitados</button>}
                </div>
            </div>
            <div className = {styles.crearDiv}>
              <div className = {styles.individualDivCrear}>
      <button onClick={()=> setCrearSport(true)} className = {styles.btnCrear}>Crear Sport</button>
      <CrearSport crearSport={crearSport} setCrearSport={setCrearSport} />
      </div>
      <div className = {styles.individualDivCrear}>
        <button onClick={()=>setCrearClub(true)} className = {styles.btnCrear}>Crear Club</button>
          <CrearClub setCrearClub={setCrearClub} crearClub={crearClub} location = {location}/>
        </div>
        <div className = {styles.individualDivCrearLast}>
        <button onClick={()=>setCrearCourt(true)} className = {styles.btnCrear}>Crear Courts</button>
        <CrearCourts setCrearCourt={setCrearCourt} crearCourt={crearCourt} />
        </div>
        </div>
        <NavbarLow />
        </div>
    )
}

export default FunctionsAdmin;