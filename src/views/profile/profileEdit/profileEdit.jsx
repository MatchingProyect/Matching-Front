import React from 'react';
import axios from 'axios';
import styles from './ProfileEdit.module.css';
import { Link } from 'react-router-dom';
import NavbarLow from '../../../components/navbarLow/navbarLow';
import { Container, TextField, Button, InputAdornment, NativeSelect } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function ProfileEdit() {
    
    const { id } = useParams();

    // Function para traer perfil del usuario
    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         try {
    //             const {data} = await axios.get(`/users/${id}`)
    //             if(data.status){
    //                 reset({
    //                     id: data.userFound.id,
    //                     name: data.userFound.name,
    //                     lastName: data.userFound.lastName,
    //                     gender:  data.userFound.gender,
    //                     dayBirth:  data.userFound.dayBirth,
    //                     email: data.userFound.email,
    //                     phone: data.userFound.phone,
    //                     creditCardWarranty: data.userFound.creditCardWarranty,
    //                     avatarImg: data.userFound.avatarImg,
    //                     password: data.userFound.password
    //                 })
    //             }

    //         } catch (error) {
    //             return error.message
    //         }
    //         }
    //     fetchData()
    // },[]);

    //HardCodeando la respuesta que deberia traer el useEffect de arriba. (Fetchear el usuario por ID)
    const user = {
        id: 123,
        name: 'Leonardo',
        lastName: 'Risco',
        gender: 'Masculino',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem accusamus iure asperiores? Ea magni, expedita nam placeat minima dolorem ab blanditiis.',
        dayBirth: '1999-01-27',
        email: '123321@gmail.com',
        phone: '123456789',
        avatarImg: 'https://i.scdn.co/image/ab6761610000e5eb275c91cb36d4206bc657c07c',
        creaditCardWarranty: '',
        password: '123',
    };

    const [estadoImg , setEstadoImg] = useState(user.avatarImg);

    const form = useForm({
        defaultValues: {
            name: user.name,
            lastName: user.lastName,
            gender: user.gender,
            dayBirth: user.dayBirth,
            email: user.email, //Confirmacion por correo Electronico
            phone: user.phone,
            creditCardWarranty: user.creaditCardWarranty, //??
            avatarImg: user.avatarImg, //Input de tipo file para la actualizacion del perfil
            password: user.password, //Boton de reset Password
            description: user.description,
        }
    });

    const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

    const onSubmit = async (data) => {
        console.log(data);
        alert(`Solicitud de actualizacion de perfil correctamente enviada al back end del usuario ${id}, resultado del formulario mostrado en consola`);

        //Function para enviar la actualizacion del perfil al backEnd
        // try {
        //     const endPoint = `/users/${id}`;
        //     const response = await axios.put(endPoint, data);
        //     console.log(123);
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
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className = {styles.photoContainer}>
                        <img src = {estadoImg} alt = {user.name} className = {styles.avatarImg}/>
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
                    <TextField
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Nombre requerido.'
                            },
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            width: '70vw',
                            marginTop: '20px',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        className={styles.input} variant='filled' id="textInput" label="Nombre" />
                    {errors.name?.type === "required" && <p className = {styles.errors}>Nombre requerido.</p>}
                    {errors.name?.type === "minLength" && <p className = {styles.errors}>Nombre debe tener al menos 3 caracteres.</p>}
                    {errors.name?.type === "maxLength" && <p className = {styles.errors}>Nombre debe tener como maximo 32 caracteres.</p>}

                    <TextField
                        {...register('lastName', {
                            required: {
                                value: true,
                                message: 'Apellido requerido.'
                            },
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.lastName}
                        className={styles.input} variant='filled' id="outlined-basic" label="Apellido" />
                    {errors.lastName?.type === "required" && <p className = {styles.errors}>Apellido requerido.</p>}
                    {errors.lastName?.type === "minLength" && <p className = {styles.errors}>Apellido debe tener al menos 3 caracteres.</p>}
                    {errors.lastName?.type === "maxLength" && <p className = {styles.errors}>Apellido debe tener como maximo 32 caracteres.</p>}

                    {/* Esto debe cambiar a un select con: Masculino, Femenino, No binario, Prefiero no especificar */}
                    <TextField
                        {...register('gender', {
                            required: true,
                            maxLength: 32,
                            minLength: 3,
                        })}
                        sx={{
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.gender}
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
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.dayBirth}
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
                            width: '70vw',
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
                            minWidth: '70vw',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            marginBottom: '3vw',
                            borderStyle: 'solid',
                            borderColor: 'black',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.274)',
                        }}
                        defaultValue={user.phone}
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
                            minWidth: '70vw',
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
                        <Button
                        type='button'
                        sx={{
                            marginTop: '3vh',
                            marginBottom: '1vh',
                            fontSize: '16px',
                            fontWeight: '500',
                            minWidth: '70vw',
                            height: '50px',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                        }}
                        color='success'
                        variant='contained'
                        className={styles.submitBtn}
                    ><Link to = "/profile/edit/resetpassword"><p className = {styles.link}>Cambiar Contraseña</p></Link></Button>
                    <Button
                        type='button'
                        sx={{
                            marginTop: '3vh',
                            marginBottom: '1vh',
                            fontSize: '16px',
                            fontWeight: '500',
                            minWidth: '70vw',
                            height: '50px',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.274)',
                        }}
                        color='success'
                        variant='contained'
                        className={styles.submitBtn}
                    ><Link to = "/profile/edit/resetemail"><p className = {styles.link}>Cambiar Correo Electronico</p></Link></Button>
                    <Button
                        type='submit'
                        sx={{
                            marginTop: '2vh',
                            marginBottom: '4vh',
                            fontSize: '16px',
                            fontWeight: '500',
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