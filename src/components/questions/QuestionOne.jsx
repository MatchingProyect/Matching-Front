import { Button } from '@mui/material'
import styles from './Questions.module.css'
import { useState } from 'react'
import { useUserContext } from '../../context/UserProvider';

export const QuestionOne = () => {

    const [ clicked,setClicked ] = useState('');
    const { datosUser,setDatosUser } = useUserContext();

    const handleClickGender = ( event ) => {
        setClicked( event.target.name );
        setDatosUser({
            ...datosUser,
            gender: event.target.name,
            questionsAnsker: true
        })
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
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cúal es tu genero?</p>
            <div className={ styles.contentOptions }>
                <Button onClick={ handleClickGender } sx={ { ..._stylesBtn.btn } } variant='outlined' name='Femenino' >
                    Femenino
                    {
                        // Esta validacion es la que hago para que si el estado es igual al name del boton al que hago click, se muestre el svg
                        clicked === 'Femenino' && handleShowCheck()
                    }
                </Button>
                <Button onClick={ handleClickGender } sx={ { ..._stylesBtn.btn } } variant='outlined' name='Masculino' >
                    Masculino
                    {
                        clicked === 'Masculino' && handleShowCheck()
                    }
                </Button>
                <Button onClick={ handleClickGender } sx={ { ..._stylesBtn.btn } } variant='outlined' name='No' >
                    Prefiero no decirlo
                    {
                        clicked === 'No' && handleShowCheck()
                    }
                </Button>
            </div>
        </div>
    </>
  )
}

// Estilos que ajuste para los componentes por defecto del material UI
const _stylesBtn = {
    btn: {
        borderRadius: '15px',
        width: '100%',
        height: '55px',
        color: '#676666',
        border: '1px solid #676666',
        justifyContent: 'flex-start',
        textTransform: 'none',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        '&:focus': {
            color: 'white',
        }
    }
}