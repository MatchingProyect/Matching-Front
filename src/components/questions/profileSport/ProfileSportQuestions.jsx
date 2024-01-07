import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../context/UserProvider';
import CardSport from '../card-sport/CardSport';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './ProfileSportQuestion.module.css';
import { Link, useNavigate } from "react-router-dom";

const ProfileSportQuestions = () => {
    
    const datosUser = useUserContext();
    const [valuesSelect, setValuesSelect] = useState({
        horario: '',
        dias: '',
        lateralidad: '',
        ladoCancha: '',
        tipoJuego: '',
        categoria: ''    
    });

    const navigate = useNavigate();

    const handleAnswerClick = (question, answer) => {
        console.log("handleAnswerClick")
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
        console.log("datosUser",datosUser)
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
                UserId: datosUser.datosUser.id
        });
            console.log('Profile creado:', response.data );
            navigate("/home");



        } catch (error) {
            console.error('Error al hacer el POST:', error );
        }
    }

    const urlIcons = `https://res.cloudinary.com/dbffmtz0y/image/upload/`;

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
                console.log("userSend",userSend);
                const response = await axios.put(`/users/${id}`,userSend);

            console.log('Respuesta del servidor:', response.data );
            } catch (error) {
                console.error('Error al hacer el POST:', error );
            }
        }

        postUser();
    }, [datosUser])
    

  return (
    <>
        <Container sx={ {  ..._styled.container } }>
            <div className={ styles.contentLogo }>
                <img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702586530/logoMin_eyv6zj.svg" alt="logo Matching" />
            </div>
            <div className={ styles.contentTitle }>
                <p className={ styles.title }>Perfil deportivo</p>
            </div>
            <div className={ styles.carrousel } >
                <CardSport iconSport={ `${ urlIcons }/v1702540814/emojione-monotone_tennis_almief.svg` } nameSport={ 'Pádel' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541735/tenis_cyo2ka.svg` } nameSport={ 'Tenis' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541734/futbol_isrkf2.svg` } nameSport={ 'Football' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541734/golf_t9uvge.svg` } nameSport={ 'Golf' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541734/basquet_bqbqrl.svg` } nameSport={ 'Basquet' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541734/hokey_upskgq.svg` } nameSport={ 'Hockey' }/>
                <CardSport iconSport={ `${ urlIcons }/v1702541735/squash_hjiwwz.svg` } nameSport={ 'Squash' }/>
            </div>
            <div className={ styles.contentQuestions }>
                <p className={ styles.pQuestions } >¿Cuál es tu lateralidad?</p>
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
                <p className={ styles.pQuestions } >¿Tu lado de la cancha?</p>
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
                <p className={ styles.pQuestions } >¿Tipo de juego?</p>
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
                <p className={ styles.pQuestions } >¿A que categoria perteneces?</p>
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
                <p className={ styles.pQuestions } >¿Horario de juego preferido?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={{
                                ..._styled.buttons}}  id='selectHorario' >Horario</InputLabel>
                        <Select sx={{
                                ..._styled.buttons,
                                ...(valuesSelect.horario && _styled.selectedButton),
                            }}  name={ 'horario' } onChange={ handleChange } value={ valuesSelect.horario } labelId='selectHorario' label='Selecciona'>
                            <MenuItem value={ 'Mañana' } >Mañana</MenuItem>
                            <MenuItem value={ 'Tarde' } >Tarde</MenuItem>
                            <MenuItem value={ 'Noche' } >Noche</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <p className={ styles.pQuestions } >¿Que dias prefieres para jugar?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={{
                                ..._styled.buttons }}  id='selectDias' >Dias</InputLabel>
                        <Select sx={{
                                ..._styled.buttons,
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
        </Container>
    </>
  )
}

const _styled = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#203144',
        width: '100vw',
    },
    buttons: {
        marginLeft: '8px',
        color: '#676666',
        border: '1px solid #676666',
        borderRadius: '20px',
    },
    select: {
        width: '171px',
        borderRadius: '10px',
        color: '#676666',
        border: '1px solid #676666'
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
        color: '#676666'
    },

    selectedButton: {
        border: '1px solid #1976d2',
    },
}

export default ProfileSportQuestions