import React, { useState } from 'react';
import AdminFunction from './AdminFunction';
import DetailClub from './DetailClub';
import axios from 'axios';
import styles from './CardClub.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs } from '../../redux/reducer';
import {Link} from 'react-router-dom';


const CardClub = ({club}) => {
  const [editClub, setEditClub] = useState(false)
  const [detailClub, setDetailClub] = useState(false)
  const dispatch = useDispatch()
  let imagen = 'https://res.cloudinary.com/dbffmtz0y/image/upload/v1704318585/360_F_332320458_OFW95fppmZAYYs3lT8CwDfK2HdQLF7RU_gmvtja.jpg';

  const user =useSelector((state) =>state.user?.datauser?.user)

  const deleteClub = async()=>{
    try {
      const deleted = await axios.put(`/clubEstado/${club.id}`, {estado: false});
      if(deleted.status)  dispatch(fetchClubs());
    } catch (error) {
      alert(error.message)
    }
  }

 if(user?.admin){
  return (
    <div className = {styles.compAdmin}>
      <div className = {styles.cardHeader}>
      <button onClick={()=>{
        setEditClub(true)
      }} className = {styles.editBtn}>Editar</button>
      <button onClick={deleteClub} className = {styles.deleteBtn}>❌</button>
      </div>
      <label className = {styles.clubLabel}>{club.name}</label>
      <button onClick={()=>{
        setDetailClub(true)
      }} className = {styles.btnInfo}>Informacion</button>
      <DetailClub detailClub={detailClub} setDetailClub={setDetailClub} club={club} />
      <AdminFunction editClub={editClub} setEditClub={setEditClub} club={club}/>
      </div>
  )
 }

  return (
    <div className = {styles.cardClub}>
      <img src = {imagen} alt = {club.name} className = {styles.imgClub}/>
       <Link to = {`/clubs/${club.id}`} className = {styles.clubLink}>      
        <h2 className = {styles.clubName}>{club.name}</h2>
        </Link>
    </div>
  )
}

export default CardClub