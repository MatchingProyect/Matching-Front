import { useForm } from 'react-hook-form'
import styles from './Questions.module.css'
import { useUserContext } from '../../context/UserProvider';

export const QuestionTwo = () => {

    const { register,handleSubmit,formState: { errors } } = useForm();
    const { datosUser,setDatosUser } = useUserContext();
    console.log( datosUser )

    const onSubmit = ( data ) => {
        console.log( data )
    }

  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cuál es tu fecha de nacimiento?</p>
            <form className={ styles.contentForm } onSubmit={ handleSubmit( onSubmit ) }>
                <input className={ styles.inputDate } type="date" { ...register( 'date',{ required: "Elige una fecha valida" } ) } />
            </form>
        </div>
    </>
  ) 
}