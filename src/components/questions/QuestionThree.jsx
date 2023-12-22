import styles from './Questions.module.css'

export const QuestionThree = () => {
  return (
    <>
        <div className={ styles.contentQuestion } >
            <p className={ styles.titleQuestion } >Completa con tu dirección:</p>
            <form className={ styles.contentFormLocation }>
                <div className={ styles.contentLocation }>
                    <input className={ styles.inputLocation } type="text" placeholder='Dirección' />
                </div>
                <p className={ styles.titleQuestion } >Tu numero de teléfono:</p>
                <div className={ styles.contentNumber } >
                    <div className={ styles.contentAreasNumber }>
                        <label className={ styles.labelArea } >Área</label>
                        <input className={ styles.inputArea } type="number" />
                    </div>
                    <div className={ styles.contentAreasNumber }>
                        <label className={ styles.labelNumber } >Número</label>
                        <input className={ styles.inputNumber } type="tel" />
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}