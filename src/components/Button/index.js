import styles from './Button.module.scss'

export default function Button({
  children,
  type,
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={styles.button}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
