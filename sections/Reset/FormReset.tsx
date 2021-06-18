import { Link, FormLabel, Input, Button } from "@chakra-ui/react"
import styles from "../../styles/sections/Reset.module.css"
import ZIcon from "../../components/Icon/Logo"
// import Image from "next/image"

export default function FormReset() {
  return (
    <div className={styles.container}>
      <div className={styles.containerBlanco}>
        <div>
          <Link href="/">
            <a>
              <ZIcon name="logo" />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.containerConFondo}>
        <div className={styles.subcontiner}>
          <h1 className={styles.h1}>Restablecer Contraseña</h1>
          <p className={styles.p}>
            Ingresa el correo asociado a tu cuenta y nos comunicaremos contigo
          </p>
          <FormLabel className={styles.Label}>Correo Electronico *</FormLabel>
          <Input
            borderColor="black.100"
            className={styles.Entrada}
            type="email"
            placeholder="Escribe tu correo aquí"
          />
          <Button variant="secondary" className={styles.Boton}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
