import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './CardUser.module.css';


const CardUser = ({ user }) => {

  const idUserQueRecibe = user?.id;
  const userLogeado = useSelector((state) => state.user.user);
  console.log(userLogeado?.user?.id);
  const idUser = userLogeado?.user?.id;

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


  return (
    <div className = {styles.userContainer}>
      <img src = {user.avatarImg} alt = {user.displayName} className = {styles.avatarImg}/>
      <h3 className = {styles.nameUser}>{user.displayName}</h3>
      <button className = {styles.btnAgregar} onClick={enviarRequest}>Agregar</button>
    </div>
  );
}

export default CardUser

