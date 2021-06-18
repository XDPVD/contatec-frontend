import {
  Text,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Checkbox,
  Button
} from "@chakra-ui/react"
import ModalCustom from "../../components/ModalCustom"
import { post } from "../../utils/http"

type PropsRegister = {
  variant: string
  width: string
  showModalButtonText: string
  isLoading?: boolean
}

export default function Register({
  variant,
  width,
  showModalButtonText,
  isLoading
}: PropsRegister) {
  const handleSubmit = async e => {
    e.preventDefault()
    const body = {
      us_correo: "sasisromero10@gmail.com",
      us_nombre: "Jhon",
      us_apellido: "Doe",
      password: "123456"
    }
    console.log("body: ", body)
    const resp = await post("/api/user/register", body)
    console.log("resp: ", resp)
  }
  return (
    <ModalCustom
      variant={variant}
      width={width}
      showModalButtonText={showModalButtonText}
    >
      <ModalHeader>
        <Text align="center">Registro</Text>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormControl id="first-name" isRequired mb="6">
            <FormLabel>Nombres</FormLabel>

            <Input placeholder="First name" />
          </FormControl>

          <FormControl mb="6" isRequired>
            <FormLabel>Apellidos</FormLabel>

            <Input placeholder="First name" />
          </FormControl>

          <FormControl mb="6" isRequired>
            <FormLabel>Correo electrónico</FormLabel>

            <Input placeholder="First name" />
          </FormControl>

          <FormControl mb="6" isRequired>
            <FormLabel>Contraseña</FormLabel>

            <Input placeholder="First name" />

            <FormHelperText>Debe tener como minimo 7 caracteres</FormHelperText>
          </FormControl>

          <FormControl mb="6" isRequired>
            <Checkbox colorScheme="red">
              <Text fontSize="xs">
                Acepto los
                <b> Términos, Condiciones y políticas de Contactec</b>
              </Text>
            </Checkbox>
          </FormControl>

          <Button
            width="full"
            variant="secondary"
            mb={6}
            type="submit"
            isLoading={isLoading}
          >
            Registrate
          </Button>
        </form>
      </ModalBody>
    </ModalCustom>
  )
}
