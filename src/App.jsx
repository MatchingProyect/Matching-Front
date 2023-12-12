import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  { Routes, Route } from 'react-router-dom';
import Home from './views/home/home.component';
import Profile from './views/profile/profile.component';
import Login from './views/login/login.component';

function App() {


  return (
    <div className = 'App'>
      <Routes>
        <Route path = '/' element = {Login}/>
        <Route path = '/home' element = {Home}/>
        <Route path = '/profile' element = {Profile}/>
      </Routes>

    </div>
  )

}

export default App
