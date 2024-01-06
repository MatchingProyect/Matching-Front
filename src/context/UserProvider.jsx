import { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ( { children } ) => {
  const [ datosUser,setDatosUser ] = useState({
    id: '',
    nombreApellido: '',
    email: '',
    pass: '',
    gender: '',
    birthday: '',
    area: '',
    phone: '',
    location: '',
    sport: '',
    questionsAnsker: false
  });

  return (
    <UserContext.Provider value={ { datosUser,setDatosUser } }>
      { children }
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext( UserContext );