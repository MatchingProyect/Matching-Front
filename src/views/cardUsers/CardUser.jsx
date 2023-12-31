import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './CardUser.module.css';
import { fetchUser, fetchUsers } from '../../redux/reducer';


const CardUser = ({ user }) => {

  const idUserQueRecibe = user?.id;
  const userLogeado = useSelector((state) => state.user?.user?.user);

  
  
  const idUser = userLogeado?.id

  

  const deleteUser = async()=>{
    try {
      const deleted = await axios.put(`/userEstado/${user?.id}`, {estado: false});
      if(deleted.status)  dispatch(fetchUsers());
    } catch (error) {
      console.log(error.message)
    }
  }

  const ascenderAAdm = async()=>{
    try {
      const usuarioAscendido = await axios.put(`/volverAdm/${user?.id}`, {admin: true})
      if(usuarioAscendido.status)  dispatch(fetchUsers());
    } catch (error) {
      
    }
  }

  const activarUser = async() =>{
    try {
      const usuarioReactivado = await axios.put(`/userEstado/${user?.id}`, {estado: true})
      if(usuarioReactivado.status) dispatch(fetchUsers()) 
    } catch (error) {
      
    }
  }

  const enviarRequest = async()=>{
    
  try {
    const requestBody = {
      UserId: idUser,
      FriendRId: idUserQueRecibe
    };
  const agregado = await axios.post('/friendRequest', requestBody)
  if(agregado) dispatch(fetchUser())

     } catch (error) {
     throw error.message
     }
  };

  if(userLogeado?.admin){
    return (
      <div className = {styles.userContainer}>
        <h2 className = {styles.nameUser}>{user?.displayName}</h2>
        
        <img className = {styles.avatarImg} src={user?.avatarImg} alt="" />
        <div className = {styles.btnUserDiv}>
        {user.estado === true ?  <button className = {styles.btnAgregar} onClick={deleteUser}>Suspender</button> :  <button onClick={activarUser}>Reactivar</button>}
       
       <button onClick={ascenderAAdm} className = {styles.btnAgregar}>Volver Admin</button>
       </div>
        </div>
    )
   }

  return (
    <div className = {styles.userContainer}>
      <img src = {user.avatarImg} alt = {user.displayName} className = {styles.avatarImg}/>
      <h3 className = {styles.nameUser}>{user.displayName}</h3>
      <button className = {styles.btnAgregar} onClick={()=> enviarRequest()}>Agregar</button>
    </div>
  );
}

export default CardUser

