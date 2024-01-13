import { useState } from 'react';
import { useUserContext } from '../../context/UserProvider';
import styles from './QuestionFour.module.css'
import { useSelector } from 'react-redux';
import { Button } from '@mui/material'

export const QuestionFour = () => {
  const sports = useSelector(state => state.user?.allSports);
  const [ clicked,setClicked ] = useState('');
  const { datosUser,setDatosUser } = useUserContext();

  console.log(sports);


  function playground (event){
    let value = event.target.value;
    console.log(value);
    setClicked(value);
    setDatosUser({
      ...datosUser,
      sport: value,
      questionsAnsker: true,
    })
  };
  
  const handleShowCheck = () => {
    return(
        <span className={ styles.check }>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 49" fill="none">
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
        <p className={styles.cuenta}>4/5</p>
      </div>
      <div className={ styles.contentQuestion } >
        <div className = {styles.divTextos}>
          <p className={ styles.titleQuestion } >Ahora crearemos tu primer perfil deportivo</p>
          <p className={ styles.subtitleQuestion } >Selecciona tu deporte favorito</p>
          </div>
          <div className={ styles.contentSports }>
            {
              sports?.map((element) => <Button key = {element.id} sx={{ ..._stylesBtn.btn }} variant='outlined' value = {element.id} onClick = {playground}>
                {element.name}
                {
                        clicked === element.id && handleShowCheck()
                }
                </Button>)
            }

          </div>
      </div>
    </>
  )
}

const _stylesBtn = {
  btn: {
      borderRadius: '10px',
      width: '163px',
      height: '55px',
      color: 'white',
      border: '1px solid #676666',
      justifyContent: 'flex-start',
      fontFamily: 'poppins',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: '700',
      boxShadow: '0px 0px 15px 1px black',
      '&:focus': {
          color: 'white',
      }
  }
}