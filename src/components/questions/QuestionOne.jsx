import { Button } from '@mui/material'
import styles from './QuestionOne.module.css'
import { useState } from 'react'
import { useUserContext } from '../../context/UserProvider';
import { useSelector } from 'react-redux';

export const QuestionOne = () => {

    const [ clicked,setClicked ] = useState('');
    const { datosUser,setDatosUser } = useUserContext();

    const userLogeado = useSelector((state) => state.user?.datauser);

    const handleClickGender = ( event ) => {

        setClicked( event.target.name );
        setDatosUser({
            id: userLogeado?.user.id,
            email: userLogeado?.user.email,
            nombreApellido: userLogeado?.user.displayName,
            gender: event.target.name,
            questionsAnsker: true
        })
        console.log("datosUser", datosUser)
    }

    //Esta funcion la cree para no repetir el codigo al tener el estado del boton que selecciona
    const handleShowCheck = () => {
        return(
            <span className={ styles.check}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                    <path d="M17 24.6207L20.1 21.5862L28.625 29.931L45.2875 14L48 17.0345L28.625 36L17 24.6207Z" fill="#DDDDDD"/>
                </svg>
            </span>
        )
    }

  return (
    <>
          <div className={styles.contentBar}>
              <div className={styles.bar}>
                  <div className={styles.barProgress} />
              </div>
              <p className={styles.cuenta}>1/5</p>
          </div>
    
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cúal es tu genero?</p>
            <div className={ styles.contentOptions }>
                <Button onClick={ handleClickGender } sx={{ ..._stylesBtn.btn }} variant='outlined' name='Femenino' >
                    Femenino
                    {
                        clicked === 'Femenino' && handleShowCheck()
                    }
                </Button>
                <Button onClick={ handleClickGender } sx={ { ..._stylesBtn.btn } } variant='outlined' name='Masculino' >
                    Masculino
                    {
                        clicked === 'Masculino' && handleShowCheck()
                    }
                </Button>
                <Button onClick={ handleClickGender } sx={ { ..._stylesBtn.btn } } variant='outlined' name='Prefiero no decirlo' >
                    Prefiero no decirlo
                    {
                        clicked === 'Prefiero no decirlo' && handleShowCheck()
                    }
                </Button>
            </div>
        </div>
    </>
  )
}

const _stylesBtn = {
    btn: {
        borderRadius: '15px',
        width: '90vw',
        height: '55px',
        color: '#676666',
        border: '1px solid #676666',
        justifyContent: 'flex-start',
        textTransform: 'none',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        boxShadow: '0px 0px 15px 1px black',
        '&:focus': {
            color: 'white',
        }
    }
}