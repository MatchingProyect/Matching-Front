import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../context/UserProvider';
import CardSport from '../card-sport/CardSport';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './ProfileSportQuestion.module.css';

const ProfileSportQuestions = () => {
    
    const { datosUser,setDatosUser } = useUserContext();
    const [ valuesSelect,setValuesSelect ] = useState({
        horario: '',
        dias: ''
    });

    const urlIcons = `https://res.cloudinary.com/dbffmtz0y/image/upload/`;
    const handleChange = ( event ) => {
        setValuesSelect({
            ...valuesSelect,
            [ event.target.name ]: event.target.value
        })
    }

    useEffect(() => {
        const { nombreApellido,area,birthday,email,gender,location,pass,phone,sport } = datosUser; 
        const nombreSplit = nombreApellido.split(' ');
        const nombre = nombreSplit[0];
        const apellido = nombreSplit[1];
        const postUser = async () => {
            try {
                const response = await axios.post('/users',{
                    name: nombre,
                    lastName: apellido,
                    gender,
                    dayBirth: birthday,
                    email,
                    phone: phone,
                    password: pass,
                    description: location
            });

            console.log('Respuesta del servidor:', response.data );
            } catch (error) {
                console.error('Error al hacer el POST:', error );
            }
        }

        postUser();
    }, [])
    

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
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Diestro</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Zurdo</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Ambas</Button>
                </div>
                <p className={ styles.pQuestions } >¿Tu lado de la cancha?</p>
                <div className={ styles.contentAnswers }>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Reves</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Derecho</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Ambas</Button>
                </div>
                <p className={ styles.pQuestions } >¿Tipo de juego?</p>
                <div className={ styles.contentAnswers }>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Competitivo</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Amistoso</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Ambas</Button>
                </div>
                <p className={ styles.pQuestions } >¿A que categoria perteneces?</p>
                <div className={ styles.contentAnswers }>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Principiante</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Intermedio</Button>
                    <Button sx={ { ..._styled.buttons } } variant='outlined'>Avanzado</Button>
                </div>
                <p className={ styles.pQuestions } >¿Horario de juego preferido?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={ { ..._styled.inputLabel } } id='selectHorario' >Horario</InputLabel>
                        <Select sx={ { ..._styled.select } } name={ 'horario' } onChange={ handleChange } value={ valuesSelect.horario } labelId='selectHorario' label='Selecciona'>
                            <MenuItem value={ 'Mañana' } >Mañana</MenuItem>
                            <MenuItem value={ 'Tarde' } >Tarde</MenuItem>
                            <MenuItem value={ 'Noche' } >Noche</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <p className={ styles.pQuestions } >¿Que dias prefieres para jugar?</p>
                <div className={ styles.contentAnswers }>
                    <FormControl>
                        <InputLabel sx={ { ..._styled.inputLabel } } id='selectDias' >Dias</InputLabel>
                        <Select sx={ { ..._styled.select } } name={ 'dias' } onChange={ handleChange } value={ valuesSelect.dias } labelId='selectDias' label='Selecciona'>
                            <MenuItem value={ 'Entre semana' } >Entre semana</MenuItem>
                            <MenuItem value={ 'Fines de semana' } >Fines de semana</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={ styles.contentSubmit }>
                <Button sx={ { ..._styled.submit } } variant='contained'>Siguiente</Button>
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
    }
}

export default ProfileSportQuestions