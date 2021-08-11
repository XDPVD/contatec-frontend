import {
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Grid,
  ModalFooter
} from "@chakra-ui/react"
import ZIcon from "../../components/Icon/ZIcon"

export default function ModalDowload() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <ZIcon name="dowload" pointer size={20} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text
              align="center"
              color="primary"
              py="6"
              fontSize="3xl"
              fontWeight="bold"
            >
              Comprobante 1057662
            </Text>
          </ModalHeader>
          <ModalCloseButton _focus={{ outline: "none" }} />

          <ModalBody color="primary" px="20">
            <Grid templateColumns="repeat(2,1fr)" gap="6">
              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Nombre del servicio:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  Marketing para redes
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Nombre del proyecto:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  Marketea tu dia
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Presupuesto:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  s/ 2000
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Cuenta total:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  s/ 2500
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Fecha de inicio:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  11-10-21
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Fecha final:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  11-11-21
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Cliente:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  Varyana León
                </Text>
              </FormControl>

              <FormControl mb="2">
                <FormLabel color="primary" fontWeight="medium" fontSize="lg">
                  Trabajador:
                </FormLabel>
                <Text fontSize="md" color="letter" fontWeight="light">
                  Leónidas León
                </Text>
              </FormControl>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="transparent"
              variant="light"
              fontSize="sm"
              width="100px"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              fontSize="sm"
              width="100px"
              variant="primary"
              type="submit"
              className="buttonDisabledPrimary"
            >
              Descargar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}