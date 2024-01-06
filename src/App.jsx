import { useEffect,  } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
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
import Help from './views/help/Help.jsx';
import { fetchUser } from './redux/reducer.js';

import Solicitudes from './views/solicitudes/Solicitudes.jsx';
import FunctionsAdmin from './views/home/FunctionsAdmin.jsx';

function App() {
  const dispatch = useDispatch();

  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    const storedUser = JSON.parse(storedUserData);
    console.log("storedUser",storedUser)
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const storedUser = JSON.parse(storedUserData);
      if (storedUser.id) {
        dispatch(fetchUser(storedUser.id));
      }
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
        <Route path='/help' element={<Help/>} />
        <Route path="/restaurar-contrasenia" element={<RestaurarContrasenia />} />
        <Route path="/restaurar-contrasenia-codigo" element={<RestaurarContraseniaCodigo />} />
        <Route path='/user/:id' element={<UserDetail/>} />
        <Route path='clubs/:id' element={<ClubsDetail/>} />
        <Route path='/functionsAdm' element={<FunctionsAdmin/>} />
        
        <Route path = "*" element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
