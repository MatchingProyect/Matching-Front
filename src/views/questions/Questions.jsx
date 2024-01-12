import { useEffect,useState } from 'react'
import { Button } from '@mui/material'
import { useUserContext } from '../../context/UserProvider'
import { QuestionOne,QuestionTwo,QuestionThree,QuestionFour } from '../../components/questions'
import ProfileSportQuestions from '../../components/questions/profileSport/ProfileSportQuestions'
import styles from './Questions.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSports } from '../../redux/reducer';

const Questions = () => {
    const dispatch = useDispatch();
    const { datosUser,setDatosUser } = useUserContext();
    const [ count,setCount ] = useState( 1 );
    const user = useSelector(state => state.user.dataUser); 

    useEffect(() => {
        if (user)
        setDatosUser({
            ...datosUser,
            email: user?.user?.email,
            nombreApellido: user?.user?.displayName,
            pass: user?.user?.password,
            id: user?.user?.id,
            

        });
        dispatch(fetchSports());
      }, [user]);
    

    const handleCountQuestion = () => {
        if( count <= 4 && datosUser.questionsAnsker ){
            setCount( count + 1 );
            setDatosUser({
                ...datosUser,
                questionsAnsker: false
            })
        }

        console.log('DatosUser', datosUser)
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
                    <div className={ styles.contentLogo }>
                        <img className={ styles.logo } src='https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg' />
                    </div>
                    <div className={ styles.contentQuestionInfo}>
                        <h2 className={ styles.questionInfo } >Ayudanos a completar tu perfil</h2>
                    </div>
                    {
                        handleRenderQuestion()
                    }
                    <div className = {styles.bottomComp}>

                    {
                        datosUser.questionsAnsker 
                        ? (
                            <Button onClick={ handleCountQuestion } sx={ { ..._styled.nextBtn } } variant='contained'>Siguiente</Button>
                        ) : (
                            <Button onClick={ handleCountQuestion } sx={ { ..._styled.nextBtnOff } } variant='contained' >Siguiente</Button>
                        )
                    }
                    </div>
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
        boxShadow: '0px 0px 10px 0px black',
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