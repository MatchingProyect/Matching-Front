import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchClubs, fetchLocations, fetchSports, fetchUsers } from './redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import Home from './views/home/home.component';
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
import './App.css';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUsers);
  const sports = useSelector((state) => state.user.allSports);
  const clubs = useSelector((state) => state.user.allClubs);
  const locations = useSelector((state) => state.user.allLocations);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchClubs());
    dispatch(fetchLocations());
    dispatch(fetchSports());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LandingPage /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home users={users} sports={sports} clubs={clubs} locations={locations} />} />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit/:id" element={<ProfileEdit />} />
        <Route path="/profile/editDepor" element={<EditDepor />} />
        <Route path="/profile/historial" element={<Historial />} />
        <Route path="/profile/historial/actividad" element={<HistorialActividad />} />
        <Route path="/profile/canjearPuntos" element = {<CanjearPuntos />}/>
        <Route path="/friends" element={<Friends />} />
        <Route path="/questions" element={ <Questions /> } />
        <Route path="/registro" element={<Registro />} />
        <Route path="/restaurar-contrasenia" element={<RestaurarContrasenia />} />
        <Route path="/restaurar-contrasenia-codigo" element={<RestaurarContraseniaCodigo />} />
        <Route path='/user/:id' element={<UserDetail/>} />
        <Route path = "*" element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
