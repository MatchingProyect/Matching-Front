import React, { useState } from 'react';
import AdminFunction from './AdminFunction';
import DetailClub from './DetailClub';
import axios from 'axios';
import styles from './CardClub.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs } from '../../redux/reducer';


const CardClub = ({club}) => {
  const [editClub, setEditClub] = useState(false)
  const [detailClub, setDetailClub] = useState(false)
  const dispatch = useDispatch()

  const user =useSelector((state) =>state.user?.user?.user)
  // console.log(club);

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
      <img src = {club.imgClub} alt = {club.name} className = {styles.imgClub}/>
        <h2 className = {styles.clubName}>{club.name}</h2>
    </div>
  )
}

export default CardClub