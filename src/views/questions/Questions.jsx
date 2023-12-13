import { Button } from '@mui/material'
import styles from './Questions.module.css'
import logo from '../../assets/logo-matching.svg'
import QuestionOne from '../../components/questions/QuestionOne'

const Questions = () => {
  return (
    <>
        <div className={ styles.contentQuestions }>
            <div id={ styles.contentLogo }>
                <img id={ styles.logo } src={ logo } alt="Logo matching" />
            </div>
            <h2 className={ styles.questionInfo } >Ayudanos a completar tu perfil</h2>
            <div className={ styles.contentBar }>
                <div className={ styles.bar }>
                    <div className={ styles.barProgress } />
                </div>
                <p className={ styles.cuenta }>1/6</p>
            </div>
             <QuestionOne />
        </div>
    </>
  )
}

export default Questions