import { useForm } from 'react-hook-form'
import styles from './Questions.module.css'

const QuestionTwo = () => {

    const { register,handleSubmit } = useForm();

    const onSubmit = ( data ) => {
        console.log( data )
    }

  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >¿Cuál es tu fecha de nacimiento?</p>
            <form className={ styles.contentForm } onSubmit={ handleSubmit( onSubmit ) }>
                <input className={ styles.inputDate } type="date" { ...register( 'date',{ required: true, } ) } />
            </form>
        </div>
    </>
  ) 
}

export default QuestionTwo