import { useEffect,  } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home.jsx';
import Registro from './views/login/Registro';
import ProfileEdit from './views/profile/profileEdit/profileEdit';
import Questions from './views/questions/Questions';
import Friends from './views/friends/friends';
import Login from './views/login/Login';
import RestaurarContrasenia from './views/login/RestaurarContrasenia';
import RestaurarContraseniaCodigo from './views/login/RestaurarContraseniaCodigo.jsx';
import Profile from './views/profile/Profile.jsx';
import LandingPage from './views/landingPage/LandingPage.jsx';
import Historial from './views/historial/Historial.jsx';
import CanjearPuntos from './views/canjearPuntos/CanjearPuntos.jsx';
import Error from './views/error/Error.jsx';
import EditDepor from './views/profile/profileEditDepor/EditDepor.jsx';
import HistorialActividad from './views/historial/HistorialActividad/HistorialActividad.jsx';
import UserDetail from './views/userDetail/UserDetail.jsx';
import ProfileChangeEmail from './views/profile/profileEdit/ProfileChangeEmail/ProfileChangeEmail.jsx';
import './App.css';
import ProfileChangePassword from './views/profile/profileEdit/ProfileChangePassword/ProfileChangePassword.jsx';
import ClubsDetail from './views/clubsDetail/ClubsDetail.jsx';
import { setDataUser, setFriends } from './redux/reducer.js';
import { useDispatch } from 'react-redux'; 

import Solicitudes from './views/solicitudes/Solicitudes.jsx';
import FunctionsAdmin from './views/home/FunctionsAdmin.jsx';
import PartidosPublicos from './views/partidosPublicos/PartidosPublicos.jsx';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    console.log("APP INICIADA")

    const storedUserData = localStorage.getItem('userData');
    if(storedUserData !="undefined"){
      const userDataObject = JSON.parse(storedUserData);
      dispatch(setDataUser(userDataObject));
    }
    const storedUserFriends= localStorage.getItem('userFriends');
    if(storedUserFriends !="undefined"){
      const userDataObject = JSON.parse(storedUserFriends);
      dispatch(setFriends(userDataObject));
    }


  }, []);


  


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LandingPage /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit/:id" element={<ProfileEdit />} />
        <Route path="/profile/edit/resetpassword" element={<ProfileChangePassword />} />
        <Route path="/profile/edit/resetemail" element={<ProfileChangeEmail />} />
        <Route path="/profile/editDepor" element={<EditDepor />} />
        <Route path="/profile/historial" element={<Historial />} />
        <Route path="/profile/historial/actividad" element={<HistorialActividad />} />
        <Route path="/profile/canjearPuntos" element = {<CanjearPuntos />}/>
        <Route path="/friends" element={<Friends />} />
        <Route path="/questions" element={ <Questions /> } />
        <Route path='/solicitudes' element={<Solicitudes/>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/restaurar-contrasenia" element={<RestaurarContrasenia />} />
        <Route path="/restaurar-contrasenia-codigo" element={<RestaurarContraseniaCodigo/>} />
        <Route path='/user/:id' element={<UserDetail/>} />
        <Route path='/clubs/:id' element={<ClubsDetail/>} />
        <Route path='/functionsAdm' element={<FunctionsAdmin/>} />
        <Route path='/partidosPublicos' element={<PartidosPublicos/>}/>
        <Route path = "*" element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
