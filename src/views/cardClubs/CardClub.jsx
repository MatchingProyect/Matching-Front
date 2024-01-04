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

  // const user =useSelector((state) =>state.user.user.user)
  console.log(club);

  // const deleteClub = async()=>{
  //   try {
  //     const deleted = await axios.delete(`/clubs/${club.id}`)
  //     if(deleted.status)  dispatch(fetchClubs());
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }

//  if(user.admin){
//   return (
//     <div>
//       <button onClick={()=>{
//         setEditClub(true)
//       }}>editar club</button>
//       <button onClick={deleteClub}>x</button>
     
//       <h2>{club.name}</h2>
//       <button onClick={()=>{
//         setDetailClub(true)
//       }} >Informacion del Club</button>
//       <DetailClub detailClub={detailClub} setDetailClub={setDetailClub} club={club} />
      
//       <AdminFunction editClub={editClub} setEditClub={setEditClub} club={club}/>
//       </div>
//   )
//  }

  return (
    <div className = {styles.cardClub}>
      <img src = {club.imgClub} alt = {club.name} className = {styles.imgClub}/>
      <div className = {styles.clubInfo}>
        <h2 className = {styles.clubName}>{club.name}</h2>
      </div>
    </div>
  )
}

export default CardClub