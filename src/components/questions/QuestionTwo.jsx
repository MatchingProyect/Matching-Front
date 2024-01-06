import { useForm } from 'react-hook-form'
import styles from './Questions.module.css'
import { useUserContext } from '../../context/UserProvider';
import { Button } from '@mui/material';

export const QuestionTwo = () => {

    const { register,handleSubmit,formState: { errors } } = useForm();
    const { datosUser,setDatosUser } = useUserContext();

    const validateDate = ( value ) => {
        const valueSplit = value.split('-');
        if(valueSplit[0] > '2010'){
            return 'La fecha debe ser menor a 2010'
        }
        return true
    }
    
    const onSubmit = ( data ) => {
        const { date } = data;
        setDatosUser({
            ...datosUser,
            birthday: date,
            questionsAnsker: true
        })
    }

  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cuál es tu fecha de nacimiento?</p>
            <form className={ styles.contentForm } onSubmit={ handleSubmit( onSubmit ) }>
                <input 
                    name='date' 
                    className={ styles.inputDate } 
                    type="date" 
                    { ...register( 'date',{ required: "Elige una fecha valida", validate: validateDate } ) } />
                    { errors.date && <p className={ styles.errors } >{ errors.date.message }</p> }
                    <Button type='submit' >Guardar fecha</Button>
            </form>
        </div>
    </>
  ) 
}