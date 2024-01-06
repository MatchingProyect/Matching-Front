import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './CardUser.module.css';
import { fetchUsers } from '../../redux/reducer';


const CardUser = ({ user }) => {

  const idUserQueRecibe = user?.id;
  const userLogeado = useSelector((state) => state.user.user);

  
  
  const idUser = userLogeado?.user?.id

  const deleteUser = async()=>{
    try {
      const deleted = await axios.put(`/userEstado/${userLogeado?.id}`, {estado: false});
      if(deleted.status)  dispatch(fetchUsers());
    } catch (error) {
      alert(error.message)
    }
  }

  const enviarRequest = async()=>{
    
  try {
    const requestBody = {
      UserId: idUser,
      FriendRId: idUserQueRecibe
    };
  await axios.post('/friendRequest', requestBody)
  

     } catch (error) {
     throw error.message
     }
  };

  if(userLogeado?.admin){
    return (
      <div>
        
        <button onClick={deleteUser}>Suspender Usuario</button>
       
        <h2>{userLogeado?.displayName}</h2>
        
        
        
        </div>
    )
   }

  return (
    <div className = {styles.userContainer}>
      <img src = {user.avatarImg} alt = {user.displayName} className = {styles.avatarImg}/>
      <h3 className = {styles.nameUser}>{user.displayName}</h3>
      <button className = {styles.btnAgregar} onClick={enviarRequest}>Agregar</button>
    </div>
  );
}

export default CardUser

