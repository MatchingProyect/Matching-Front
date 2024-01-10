import { useUserContext } from '../../context/UserProvider';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './Questions.module.css'

export const QuestionThree = () => {

    const { register,handleSubmit,formState: { errors } } = useForm();
    const { datosUser,setDatosUser } = useUserContext();
    
    const onSubmit = ( data ) => {
        const { adress,area,phone } = data;
        setDatosUser({
            ...datosUser,
            location: adress,
            area,
            phone,
            questionsAnsker: true
        })
    }

  return (
    <>
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
                    <div className={ styles.contentAreasNumber }>
                        <label className={ styles.labelArea } >Área</label>
                        <input 
                            className={ styles.inputArea } 
                            type="number"
                            { ...register ( 'area', { required: 'Este campo no puede ir vacio' } ) }
                        />
                    </div>
                    <div className={ styles.contentAreasNumber }>
                        <label className={ styles.labelNumber } >Número</label>
                        <input 
                            className={ styles.inputNumber } 
                            type="tel"
                            { ...register ( 'phone', { required: 'El numero de telefono no puede estar vacio' } ) }
                        />
                    </div>
                </div>
                <span className={ styles.errorsSpan }>
                    { errors.phone && <p className={ styles.errors } >{ errors.phone.message }</p> }
                </span>
                <Button type='submit'>Guardar datos</Button>
            </form>
        </div>
    </>
  )
}