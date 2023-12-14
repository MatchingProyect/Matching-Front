import styles from './Questions.module.css'

const QuestionThree = () => {
  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >Completa con tu dirección:</p>
            <input type="text" placeholder='Dirección'/>
            <p className={ styles.titleQuestion } >Tu numero de teléfono:</p>
            <div>
                <div>
                    <label htmlFor="">Area</label>
                    <input type="number" />
                </div>
                <div>
                    <label htmlFor="">Numero</label>
                    <input type="tel" />
                </div>
            </div>
        </div>
    </>
  )
}

export default QuestionThree