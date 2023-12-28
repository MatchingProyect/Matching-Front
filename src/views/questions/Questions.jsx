import { useEffect,useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserProvider'
import { QuestionOne,QuestionTwo,QuestionThree,QuestionFour } from '../../components/questions'
import ProfileSportQuestions from '../../components/questions/profileSport/ProfileSportQuestions'
import logo from '../../assets/logo-matching.svg'
import styles from './Questions.module.css'

const Questions = () => {

    const { datosUser,setDatosUser } = useUserContext();
    const [ count,setCount ] = useState( 1 );
    const navigate = useNavigate();

    useEffect(() => {
        if( !datosUser.nombreApellido || !datosUser.email || !datosUser.pass ){
            navigate('/login');
        }
    }, [ datosUser,history ])
    

    const handleCountQuestion = () => {
        if( count <= 4 && datosUser.questionsAnsker ){
            setCount( count + 1 );
            setDatosUser({
                ...datosUser,
                questionsAnsker: false
            })
        }
    }

    const handleRenderQuestion = () => {
        if( count === 1 ){
            return <QuestionOne />
        }else if( count === 2 ){
            return <QuestionTwo />
        }else if( count === 3 ){
            return <QuestionThree />
        }else{
            return <QuestionFour />
        }
    }

  return (
    <>  
        {
            count < 5 
            ? (
                <div className={ styles.contentQuestions }>
                    <div id={ styles.contentLogo }>
                        <img id={ styles.logo } src={ logo } alt="Logo matching" />
                    </div>
                    <div className={ styles.contentQuestionInfo}>
                        <h2 className={ styles.questionInfo } >Ayudanos a completar tu perfil</h2>
                    </div>
                    <div className={ styles.contentBar }>
                        <div className={ styles.bar }>
                            <div className={ styles.barProgress } />
                        </div>
                        <p className={ styles.cuenta }>{ count }/4</p>
                    </div>
                    {
                        handleRenderQuestion()
                    }

                    {
                        datosUser.questionsAnsker 
                        ? (
                            <Button onClick={ handleCountQuestion } sx={ { ..._styled.nextBtn } } variant='contained'>Siguiente</Button>
                        ) : (
                            <Button onClick={ handleCountQuestion } sx={ { ..._styled.nextBtnOff } } variant='contained' >Siguiente</Button>
                        )
                    }

                </div>
            )
            : (
                <ProfileSportQuestions />
            )
        }
    </>
  )
}

const _styled = {
    nextBtn: {
        width: '338px',
        height: '50px',
        borderRadius: '10px',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '30px',
    },
    nextBtnOff: {
        width: '338px',
        height: '50px',
        borderRadius: '10px',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '30px',
        backgroundColor: '#657689',
        color: 'white',
        '&:focus': {
            backgroundColor: '#657689',
        }
    }
}

export default Questions