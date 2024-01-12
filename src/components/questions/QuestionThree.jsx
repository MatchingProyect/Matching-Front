import { useUserContext } from '../../context/UserProvider';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './QuestionThree.module.css';
import { useState } from 'react';

export const QuestionThree = () => {

    const { register,handleSubmit,formState: { errors } } = useForm();
    const { datosUser,setDatosUser } = useUserContext();
    const [confirma, setConfirma] = useState('');
    
    const onSubmit = ( data ) => {
        const { adress,area,phone } = data;
        setDatosUser({
            ...datosUser,
            location: adress,
            area,
            phone,
            questionsAnsker: true
        })
        setConfirma('Información guardada exitosamente');
    }

  return (
    <>
    <div className={styles.contentBar}>
              <div className={styles.bar}>
                  <div className={styles.barProgress} />
              </div>
              <p className={styles.cuenta}>3/5</p>
          </div>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >Completa con tu dirección:</p>
            <form className={ styles.contentFormLocation } onSubmit={ handleSubmit( onSubmit ) }>
                <div className={ styles.contentLocation }>
                    <input 
                        className={ styles.inputLocation } 
                        type="text" 
                        placeholder='Dirección'
                        { ...register ( 'adress', { required: 'Este campo no puede ir vacio' } ) }
                    />
                    { errors.adress && <p className={ styles.errors } >{ errors.adress.message }</p> }
                </div>
                <p className={ styles.titleQuestion } >Tu numero de teléfono:</p>
                <div className={ styles.contentNumber } >
                    <div className={ styles.contentAreasNumberCode }>
                        <label className={ styles.labelInputs } >Área</label>
                        <input 
                            className={ styles.inputArea } 
                            type="number"
                            placeholder='+'
                            { ...register ( 'area', { required: 'Este campo no puede ir vacio' } ) }
                        />
                    </div>
                    <div className={ styles.contentAreasNumber }>
                        <label className={ styles.labelInputs } >Número</label>
                        <input 
                            className={ styles.inputNumber } 
                            placeholder='Numero'
                            type="tel"
                            { ...register ( 'phone', { required: 'El numero de telefono no puede estar vacio' } ) }
                        />
                    </div>
                </div>
                <span className={ styles.errorsSpan }>
                    { errors.phone && <p className={ styles.errors } >{ errors.phone.message }</p> }
                </span>
                <Button type='submit'
                sx = {{
                    backgroundColor: 'white',
                        width: '40%',
                        height: '40%',
                        fontWeight: '700',
                        fontFamily: 'poppins',
                        boxShadow: '0px 0px 15px 1px black',
                        marginTop: '20px',
                }}
                >Guardar datos</Button>
                <span className = {styles.alertSpan}>{confirma}</span>
            </form>
        </div>
    </>
  )
}