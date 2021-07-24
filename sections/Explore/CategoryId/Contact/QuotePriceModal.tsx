// import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Text,
  ModalHeader,
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Grid,
  Button,
  useDisclosure,
  Textarea,
  Box
} from "@chakra-ui/react"

import { useForm } from "../../../../utils/hooks/useForm"
import { useError } from "../../../../utils/hooks/useError"
import { validRate } from "./utils/valid"
// import { post } from "../../../../utils/http"
// import showToast from "../../../../components/Toast"

type PropsRegister = {
  variant: string

  width: string

  showModalButtonText: string
}

// TODO: manejar error de token cuando se vuelve a dar click en activar cuenta

export default function QuotePriceModal({
  variant,
  width,
  showModalButtonText
}: PropsRegister) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [description, setDescription] = useState("")
  // const router = useRouter()

  const [values, handleInputChange, reset] = useForm({
    name: "",
    budget: "",
    date: ""
  })

  const { name, budget, date } = values

  const [errors, setErrors, resetErrors] = useError({
    name: "",
    budget: "",
    date: "",
    description: ""
  })

  const handleTextArea = e => {
    const inputValue = e.target.value
    setDescription(inputValue)
  }

  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    // TODO: cambiar valid register
    const { errors: errorsForm, isValid } = validRate(values, 0)

    setErrors(errorsForm)

    if (isValid) {
      setIsPosting(true)
      setIsPosting(false)
    }
  }
  useEffect(() => {
    if (!isOpen) {
      reset()
      resetErrors()
    }
  }, [isOpen])
  return (
    <>
      <Button variant={variant} w={width} onClick={onOpen}>
        {showModalButtonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Text align="center" color="primary" py="2" fontSize="2xl">
              Cotizar servicio
            </Text>
            <Text
              align="center"
              color="gray"
              fontSize="md"
              py="2"
              fontWeight="light"
            >
              Horal local: {format(new Date(), "HH:mm")}
            </Text>
          </ModalHeader>

          <ModalBody color="primary" px="10">
            <form onSubmit={handleSubmit}>
              <FormControl mb="6" id="first-name" isInvalid={!!errors.name}>
                <FormLabel>Nombres del proyecto</FormLabel>

                <Input
                  type="text"
                  placeholder="Escribe nombre aquí"
                  name="name"
                  onChange={handleInputChange}
                  value={name}
                />

                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <Grid templateColumns="repeat(2,1fr)" gap="6">
                <FormControl mb="6" isInvalid={!!errors.budget}>
                  <FormLabel>Presupuesto</FormLabel>
                  <Input
                    type="text"
                    placeholder="s/" // eslint-disable-next-line camelcase
                    name="budget"
                    onChange={handleInputChange}
                    value={budget}
                  />
                  <FormErrorMessage>{errors.budget}</FormErrorMessage>
                </FormControl>
                <FormControl mb="6" isInvalid={!!errors.date}>
                  <FormLabel>Fecha límite del proyecto</FormLabel>
                  <Input
                    type="date"
                    placeholder="Seleccionar fecha"
                    name="date"
                    onChange={handleInputChange}
                    value={date}
                  />
                  <FormErrorMessage>{errors.date}</FormErrorMessage>
                </FormControl>
              </Grid>

              <FormControl mb="2" isInvalid={!!errors.descripcion}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Escribe un resumen del proyecto aquí"
                  onChange={handleTextArea}
                  value={description}
                  h="100"
                  maxLength={100}
                  resizable="false"
                />
                <Box
                  d="flex"
                  justifyContent="flex-end"
                  color="gray"
                  fontSize="sm"
                  pt="2"
                >
                  <span>{description.length}/100</span>
                </Box>
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <Button
                width="full"
                variant="primary"
                my={2}
                type="submit"
                isLoading={isPosting}
                className="buttonDisabledPrimary"
              >
                Enviar cotización
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
