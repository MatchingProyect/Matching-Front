import { useForm } from 'react-hook-form'
import styles from './QuestionTwo.module.css'
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
          <div className={styles.contentBar}>
              <div className={styles.bar}>
                  <div className={styles.barProgress} />
              </div>
              <p className={styles.cuenta}>2/5</p>
          </div>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cuál es tu fecha de nacimiento?</p>
            <form className={ styles.contentForm } onSubmit={ handleSubmit( onSubmit ) }>
                <input 
                    name='date' 
                    className={ styles.inputDate } 
                    type="date" 
                    { ...register( 'date',{ required: "Elige una fecha valida", validate: validateDate } ) } />
                    { errors.date && <p className={ styles.errors } >{ errors.date.message }</p> }
                    <Button type='submit' sx = {{
                        backgroundColor: 'white',
                        width: '60%',
                        height: '40%',
                        fontWeight: '700',
                        fontFamily: 'poppins',
                        boxShadow: '0px 0px 15px 1px black',
                        marginTop: '20px',

                    }}>Guardar Fecha</Button>
            </form>
        </div>
    </>
  ) 
}