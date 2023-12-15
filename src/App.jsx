import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/home.component';
import Registro from './views/login/Registro'; 
import ProfileEdit from './views/profile/profileEdit/profileEdit';
import Questions from './views/questions/Questions';
import './App.css';
import Friends from './views/friends/friends';
import Login from './views/login/Login';
import RestaurarContrasenia from './views/login/RestaurarContrasenia';
import RestaurarContraseniaCodigo from './views/login/RestaurarContraseniaCodigo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs, fetchLocations, fetchSports, fetchUsers } from './redux/reducer';
import Profile from './views/profile/Profile.jsx';

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
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home users={users} sports={sports} clubs={clubs} locations={locations} />} />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/questions" element={ <Questions /> } />
        <Route path="/registro" element={<Registro />} />
        <Route path="/restaurar-contrasenia" element={<RestaurarContrasenia />} />
        <Route path="/restaurar-contrasenia-codigo" element={<RestaurarContraseniaCodigo />} />
      </Routes>
    </div>
  );
}

export default App;
