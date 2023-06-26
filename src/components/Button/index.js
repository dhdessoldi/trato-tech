import styles from './Button.module.scss'

export default function Button({ children, type, onClick, disabled }) {
  return (
    <button disabled={disabled} className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
