import styles from './Header.module.css'
import Logo from '../assets/Logo.svg'

export function Header() {
  return (
    <div className={styles.container}>
      <img src={Logo} alt="Imagem Foguete azul" />
    </div>
  )
}