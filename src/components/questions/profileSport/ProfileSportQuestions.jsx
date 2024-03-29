import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../context/UserProvider';
import CardSport from '../card-sport/CardSport';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './ProfileSportQuestion.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setDataUser } from '../../../redux/reducer'; 
import { useSelector } from 'react-redux';

const ProfileSportQuestions = () => {
    
    const datosUser = useUserContext();
    const { sport } = datosUser.datosUser;
    const [valuesSelect, setValuesSelect] = useState({
        horario: '',
        dias: '',
        lateralidad: '',
        ladoCancha: '',
        tipoJuego: '',
        categoria: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogeado = useSelector((state) => state.user?.datauser);



    const handleAnswerClick = (question, answer) => {
        console.log("valuesSelect", valuesSelect)
        setValuesSelect({
            ...valuesSelect,
            [question]: answer,
        });
    };

    
    const handleChange = (event) => {
        setValuesSelect({
            ...valuesSelect,
            [event.target.name]: event.target.value,
        });
    };




    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/profiles`,{
                laterality: valuesSelect.lateralidad,
                courtSide: valuesSelect.ladoCancha,
                matchType: valuesSelect.tipoJuego,
                dayPreference: valuesSelect.dias,
                timePreference: valuesSelect.horario,
                categoryLvl: valuesSelect.categoria,
                UserId: datosUser.datosUser.id,
                SportId: sport,
        });
            console.log('Profile creado:', response.data );
            navigate("/home");



        } catch (error) {
            console.error('Error al hacer el POST:', error );
        }
    }

    useEffect(() => {
        const { nombreApellido,birthday,email,gender,location,phone, id } = datosUser.datosUser; 

        const postUser = async () => {
            try {
                const userSend = {
                    displayName: nombreApellido,
                    gender,
                    dayBirth: birthday,
                    email,
                    phone: phone,
                    description: location
                }
                console.log('userSend', userSend );

                const response = await axios.put(`/users/${id}`,userSend);      
                console.log('Respuesta del servidor:', response.data );

                const userDis = { ...userLogeado.user, ...response.data.userUpdated };
                console.log("userDis",userDis)

                dispatch(setDataUser({
                    user: {
                        ...userDis                    
                    }
                }));

            } catch (error) {
                console.error('Error al hacer el POST:', error );
            }
        }

        postUser();
    }, [datosUser])

    

  return (
    <>    
        <div className = {styles.holeProfileQuestionsDiv}>
    <div className={ styles.contentLogo }>
                <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702491179/Matching_rlj4xk.svg" alt="logo Matching" className = {styles.logo} />
            </div>
    <div className={styles.contentBar}>
              <div className={styles.bar}>
                  <div className={styles.barProgress} />
              </div>
              <p className={styles.cuenta}>5/5</p>
    </div>
            <div className={ styles.contentTitle }>
                <p className={ styles.title }>Vamos a registrar tu primer perfil deportivo</p>
            </div>
            <div className={ styles.contentQuestions }>
                <p className={ styles.pQuestions } >¿Lateralidad?</p>
                <div className={ styles.contentAnswers }>
                    <Button  sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.lateralidad === 'Diestro' && _styled.selectedButton),
                            }} variant="outlined" onClick={() => handleAnswerClick('lateralidad', 'Diestro')}>
                        Diestro
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.lateralidad === 'Zurdo' && _styled.selectedButton),
                            }}  variant="outlined" onClick={() => handleAnswerClick('lateralidad', 'Zurdo')}>
                        Zurdo
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.lateralidad === 'Ambas' && _styled.selectedButton),
                            }}  variant="outlined" onClick={() => handleAnswerClick('lateralidad', 'Ambas')}>
                        Ambas
                    </Button>
                </div>
                <p className={ styles.pQuestions } >¿Lado de la cancha?</p>
                <div className={ styles.contentAnswers }>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.ladoCancha === 'Reves' && _styled.selectedButton),
                            }}  variant="outlined" onClick={() => handleAnswerClick('ladoCancha', 'Reves')}>
                        Reves
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.ladoCancha === 'Derecho' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('ladoCancha', 'Derecho')}>
                        Derecho
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.ladoCancha === 'Ambas' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('ladoCancha', 'Ambas')}>
                        Ambas
                    </Button>

                </div>
                <p className={ styles.pQuestions } >¿Tipo de juego preferido?</p>
                <div className={ styles.contentAnswers }>
                <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.tipoJuego === 'Competitivo' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('tipoJuego', 'Competitivo')}>
                    Competitivo
                </Button>
                <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.tipoJuego === 'Amistoso' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('tipoJuego', 'Amistoso')}>
                    Amistoso
                </Button>
                <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.tipoJuego === 'Ambas' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('tipoJuego', 'Ambas')}>
                    Ambas
                </Button>
                    
                </div>
                <p className={ styles.pQuestions } >¿Nivel de juego?</p>
                <div className={ styles.contentAnswers }>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.categoria === 'Principiante' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('categoria', 'Principiante')}>
                        Principiante
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.categoria === 'Intermedio' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('categoria', 'Intermedio')}>
                        Intermedio
                    </Button>
                    <Button sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.categoria === 'Avanzado' && _styled.selectedButton),
                            }}   variant="outlined" onClick={() => handleAnswerClick('categoria', 'Avanzado')}>
                        Avanzado
                    </Button>
                </div>
                <p className={ styles.pQuestions } >¿Horario preferido?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={{
                                ..._styled.inputLabel}}  id='selectHorario' >Horario</InputLabel>
                        <Select sx={{
                                ..._styled.select,
                                ...(valuesSelect.horario && _styled.selectedButton),
                            }}  name={ 'horario' } onChange={ handleChange } value={ valuesSelect.horario } labelId='selectHorario' label='Selecciona'>
                            <MenuItem value={ 'Mañana' } >Mañana</MenuItem>
                            <MenuItem value={ 'Tarde' } >Tarde</MenuItem>
                            <MenuItem value={ 'Noche' } >Noche</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <p className={ styles.pQuestions } >¿Dias preferidos?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={{
                                ..._styled.inputLabel }}  id='selectDias' >Dias</InputLabel>
                        <Select sx={{
                                ..._styled.select,
                                ...(valuesSelect.dias  && _styled.selectedButton),
                            }} name={ 'dias' } onChange={ handleChange } value={ valuesSelect.dias } labelId='selectDias' label='Selecciona'>
                            <MenuItem value={ 'Entre semana' } >Entre semana</MenuItem>
                            <MenuItem value={ 'Fines de semana' } >Fines de semana</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={ styles.contentSubmit }>
            <Button
                        sx={{ ..._styled.submit }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                Siguiente
            </Button>
            </div>
        </div>
    </>
  )
}

const _styled = {
    buttons: {
        marginLeft: '8px',
        color: 'white',
        border: '2px solid #676666',
        borderRadius: '10px',
        fontSize:'13px',
        fontFamily: 'Poppins',
    },
    select: {
        width: '180px',
        height: '55px',
        borderRadius: '10px',
        color: 'white',
        border: '2px solid #676666'
    },
    submit: {
        height: '50px',
        width: '388px',
        borderRadius: '10px',
        fontSize: '20px',
        fontFamily: 'Poppins',
        fontWeight: '600',
    },
    inputLabel: {
        color: 'white',
        width: '100px',
    },

    selectedButton: {
        border: '1px solid #1976d2',
    },
}

export default ProfileSportQuestions