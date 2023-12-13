import { Button } from '@mui/material'
import styles from './QuestionOne.module.css'

const QuestionOne = () => {
  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cúal es tu genero?</p>
            <div className={ styles.contentOptions }>
                <Button sx={ { ..._stylesBtn.btn } } variant='outlined' >Femenino</Button>
                <Button sx={ { ..._stylesBtn.btn } } variant='outlined' >Masculino</Button>
                <Button sx={ { ..._stylesBtn.btn } } variant='outlined' >Prefiero no decirlo</Button>
            </div>
        </div>
    </>
  )
}

const _stylesBtn = {
    btn: {
        display: 'flex',
        borderRadius: '20px',
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
    }
}

export default QuestionOne