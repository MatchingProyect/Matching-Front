
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './CardUser.module.css';
import { fetchUpdateFriendRequest, fetchUsers } from '../../redux/reducer';
import { useDispatch } from 'react-redux'; 
import PropTypes from 'prop-types';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CardUser = ({ user }) => {

  const dispatch = useDispatch()
  const idUserQueRecibe = user?.id;
  const userInfo = useSelector((state) => state.user?.datauser?.user);
  const [open, setOpen] = React.useState(false);
  const [sendSolicitud, setSend] = React.useState(false);

  useEffect(() => {
    userInfo?.FriendRequests?.map(userFriend => {
      if (userFriend.FriendRId == user.id){
        setSend(true)
      }

    })
  },[userInfo])


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
      console.log(error)
    }
  }

  const activarUser = async() =>{
    try {
      const usuarioReactivado = await axios.put(`/userEstado/${user?.id}`, {estado: true})
      if(usuarioReactivado.status) dispatch(fetchUsers()) 
    } catch (error) {
      console.log(error)

    }
  }

  const enviarRequest = async()=>{
    try {
      const requestBody = {
        UserId: userInfo.id,
        FriendRId: idUserQueRecibe
      };
      console.log("requestBody", requestBody)
      const {data} = await axios.post('/friendRequest', requestBody)
      if(data) {
          handleClick()
          dispatch(fetchUpdateFriendRequest(data.request))
        }
      } catch (error) {
        console.log(error)
      throw error.message
      }
  };

  if(userInfo?.admin){
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
      {sendSolicitud? 
        (
          <div>
            Solicitud Enviada
          </div>
        ) : 
        (
        <button className = {styles.btnAgregar} onClick={()=> enviarRequest()}>Agregar</button>
      )}

      <Stack spacing={2}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Solicitud enviada correctamente!
          </Alert>
        </Snackbar>
      </Stack>


    </div>
  );
}

CardUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CardUser

