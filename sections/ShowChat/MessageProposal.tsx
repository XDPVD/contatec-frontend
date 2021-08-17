import { Box, Button, Flex, Text } from "@chakra-ui/react"
import router from "next/router"
import { useContext } from "react"
import { DataContext } from "../../store/GlobalState"

interface MessageProps {
  message: any
  own?: boolean
}
export default function MessageProposal({ message, own }: MessageProps) {
  const { state } = useContext(DataContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { auth, socket } = state
  console.log("message: ", message)

  const handleAcceptPropose = async () => {}
  return (
    <Box
      d="flex"
      justifyContent={`${own === true ? "flex-end" : "flex-start"}`}
      align="center"
      my="3"
      mx="2"
    >
      <Box maxW="500px">
        <Flex
          px="5"
          color="gray"
          align="center"
          py="1"
          maxW="500px"
          direction={`${own === true ? "row-reverse" : "row"}`}
        >
          {/* <Avatar size="md" name="name" position="relative" mx="2" /> */}

          <Box
            px="3"
            bg="gray.100"
            color="red"
            d="flex"
            flexDirection="column"
            justifyContent="start"
            borderRadius="lg"
            py="2"
            borderColor="primary"
            borderWidth="1px"
          >
            <strong>Presupuesto: </strong>
            <br />
            <span>{message.msj_precio_prop}</span>

            <strong>Fecha límite: </strong>
            <br />
            <span>{message.msj_caducidad_prop}</span>

            <strong>Descripcion: </strong>
            <br />
            <span>{message.msj_descripcion_prop}</span>

            {!own && (
              <Button
                variant="primary"
                w="100px"
                onClick={() => {
                  console.log("aceptar propuesta")
                  // router.push("/mostrar-datos")
                }}
                mx="auto"
              >
                Contratar
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}