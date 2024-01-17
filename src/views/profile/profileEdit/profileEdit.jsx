import React from 'react';
import axios from 'axios';
import styles from './ProfileEdit.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import { Container, TextField, Button, InputAdornment, NativeSelect } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function ProfileEdit() {
    const userLogeado = useSelector(state =>  state.user?.datauser?.user);
    const [estadoImg , setEstadoImg] = useState(userLogeado?.avatarImg);

    const form = useForm({
        defaultValues: {
            id: userLogeado?.id,
            admin: false,
            displayName: userLogeado?.displayName,
            gender: userLogeado?.gender,
            dayBirth: userLogeado?.dayBirth,
            email: userLogeado?.email, //Confirmacion por correo Electronico
            phone: userLogeado?.phone,
            creditCardWarranty: userLogeado?.creaditCardWarranty, //??
            avatarImg: estadoImg, //Input de tipo file para la actualizacion del perfil (Done)
            password: userLogeado?.password, //Boton de reset Password
            description: userLogeado?.description,
            onLine: true
        }
    });
    const { register, handleSubmit, formState: { errors }, setValue } = form;

    const sumiteando = (data) => {
        console.log('formData', data);
        alert(`Solicitud de actualizacion de perfil correctamente enviada.`);

        //Function para enviar la actualizacion del perfil al backEnd
        // try {
        //     const endPoint = `/users/${data.id}`;
        //     const response = await axios.put(endPoint, data);
        //     if (response.status) {
        //         dispatch(fetchProfiles());
        //     } else {
        //         alert(response.message);
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    };



    return (
        <div className={styles.profileEditHoleContainer}>
            <Container className={styles.divOne} maxWidth='string'>
                <Link to='/profile'><img src="https://res.cloudinary.com/dbffmtz0y/image/upload/v1702573291/return_w8ycd2.svg" alt="Return" className={styles.return} /></Link>
                <h1 className={styles.titulo}>Editar Perfil</h1>
            </Container>
            <Container className={styles.divTwo} maxWidth='string' sx={{ display: 'flex', flex: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <form className={styles.form} onSubmit = {handleSubmit(sumiteando)} >
                    <div className = {styles.photoContainer}>
                        <img src = {estadoImg} alt = {userLogeado?.displayName} className = {styles.avatarImg}/>
                        <input 
                        type='file' 
                        accept='image/*' 
                        name = '123' 
                        className = {styles.inputFile}
                        //Saving Foto URL
                        onChange={({target: {files}}) => {
                            let result = URL.createObjectURL(files[0]);
                            console.log(files, result);
                            setEstadoImg(result);
                            setValue('avatarImg', result);
                        }}
                        //Saving Foto Name
                        // onChange={({target: {files}}) => {
                        //     let result2 = files[0].name;
                        //     console.log(files, result2);
                        //     setEstadoImg(result2);
                        //     setValue('avatarImg', result2);
                        // }}
                        autoFocus/>
                    </div>
                    <div className = {styles.divInputs}>
                    <TextField
                        {...register('displayName', {
                            required: {
                                value: true,
                                message: 'Nombre requerido.'
                            },
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '80%',
                            marginTop: '20px',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            fontWeight: '700',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="textInput" label="Nombre" />
                    {errors.name?.type === "required" && <p className = {styles.errors}>Nombre requerido.</p>}
                    {errors.name?.type === "minLength" && <p className = {styles.errors}>Nombre debe tener al menos 3 caracteres.</p>}
                    {errors.name?.type === "maxLength" && <p className = {styles.errors}>Nombre debe tener como maximo 32 caracteres.</p>}

                    <TextField
                        {...register('gender', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '80%',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        
                        className={styles.input}
                        variant='filled'
                        id="outlined-basic"
                        label="Genero">
                        <option value={'Masculino'}>Masculino</option>
                        <option value={'Femenino'}>Femenino</option>
                        <option value={'No Binario'}>No Binario</option>
                        <option value={'Prefiero no especificar'}>Prefiero no especificar</option>
                    </TextField>
                    {errors.gender?.type === "required" && <p className = {styles.errors}>Genero requerido.</p>}

                    <TextField
                        {...register('dayBirth', {
                            required: {
                                value: true,
                                message: `Fecha de nacimiento requerida.`
                            },
                            maxLength: 32,
                            minLength: 3,
                            pattern: {
                                value: /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/,
                                message: 'Formato Incorrecto.',
                            }
                        })}
                        sx={{
                            maxWidth: '70vw',
                            minWidth: '80%',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        
                        className={styles.input}
                        variant='filled' id="outlined-basic"
                        label="Fecha de Nacimiento"
                        type='date' />
                    {errors.dayBirth && <p className = {styles.errors}>{errors.dayBirth.message}</p>}
                    <TextField
                        {...register('email', {
                            required: {
                                value: true,
                                message: `Correo requerido.`
                            },
                            maxLength: 20,
                            pattern: {
                                value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: `Correo no valido.`
                            }
                        })}
                        sx={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="outlined-basic" label="Correo electronico" />
                    {errors.email && <p className = {styles.errors}>{errors.email.message}</p>}

                    <TextField
                        {...register('phone', {
                            required: {
                                value: true,
                                message: `Numero telefonico requerido.`
                            },
                            maxLength: {
                                value: '12',
                                message: `Debe contener menos de 12 digitos.`
                            },
                            minLength: {
                                value: '8',
                                message: `Debe contener mas de 8 digitos.`
                            }
                        })}
                        sx={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+ 51</InputAdornment>,
                        }}

                        className={styles.input} variant='filled' id="outlined-basic" label="Numero Telefonico" />
                    {errors.phone && <p className = {styles.errors}>{errors.phone.message}</p>}
                    <TextField
                        {...register('description', { 
                            required: false, 
                            maxLength: {
                                value: '260',
                                message: 'La descripcion no debe exceder los 260 caracteres.'
                            }
                        })}
                        sx={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '2vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} multiline rows={4} variant='filled' id="outlined-multiline-static" label="Descripcion" />
                        <p className = {styles.aviso}>260 caracteres</p>
                        {errors.description && <p className = {styles.Description}>{errors.description.message}</p>}
                        </div>
                        <Button
                        sx={{
                            marginTop: '2vh',
                            marginBottom: '1vh',
                            fontSize: '16px',
                            fontWeight: '500',
                            backgroundColor: '#203144',
                            minWidth: '70vw',
                            height: '50px',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                        }}
                        color='success'
                        variant='contained'
                        className={styles.submitBtn}
                    ><Link to = "/profile/edit/resetpassword"><p className = {styles.link}>Cambiar Contraseña</p></Link></Button>
                    <Button
                        sx={{
                            marginTop: '1vh',
                            marginBottom: '1vh',
                            fontSize: '16px',
                            fontWeight: '500',
                            backgroundColor: '#203144',
                            minWidth: '70vw',
                            height: '50px',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                        }}
                        color='success'
                        variant='contained'
                        className={styles.submitBtn}
                    ><Link to = "/profile/edit/resetemail"><p className = {styles.link}>Cambiar Correo Electronico</p></Link></Button>
                    <Button
                        type="submit"
                        sx={{
                            marginTop: '1vh',
                            marginBottom: '4vh',
                            backgroundColor: '#203144',
                            fontSize: '16px',
                            fontWeight: '600',
                            minWidth: '70vw',
                            height: '50px',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                        }}
                        color='success'
                        variant='contained'
                        className={styles.submitBtn}
                    >Guardar Cambios</Button>
                </form>
            </Container>
            <NavbarLow />
        </div>
    );
};