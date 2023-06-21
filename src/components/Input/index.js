import { forwardRef } from 'react'
import styles from './Input.module.scss'

function Input({ value, onchange, ...outrosProps }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onchange}
      className={styles.input}
      {...outrosProps}
    />
  )
}

export default forwardRef(Input)
