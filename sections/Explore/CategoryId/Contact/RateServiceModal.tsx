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
  Button,
  useDisclosure,
  Textarea,
  Box
} from "@chakra-ui/react"
import ReactStars from "react-rating-stars-component"
import { useError } from "../../../../utils/hooks/useError"
import { useForm } from "../../../../utils/hooks/useForm"

import { validRate } from "./utils/valid"
import { post } from "../../../../utils/http"
// import { post } from "../../../../utils/http"
// import showToast from "../../../../components/Toast"

type PropsModal = {
  variant: string
  width: string
  showModalButtonText: string
  post: Record<any, any>
  trabajo: any
  setIsUpdatingServices?: any
  updateValoration?: boolean
}

// TODO: manejar error de token cuando se vuelve a dar click en activar cuenta

export default function RateServiceModal({
  variant,
  width,
  showModalButtonText,
  post: postItem,
  trabajo,
  setIsUpdatingServices,
  updateValoration
}: PropsModal) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [values, handleInputChange, reset] = useForm({
    description: ""
  })

  const { description } = values
  const [errors, setErrors, resetErrors] = useError({
    description: ""
  })
  const [rate, setRate] = useState(0)

  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const { errors: errorsForm, isValid } = validRate(values, rate)
    setErrors(errorsForm)
    if (isValid) {
      const review = {
        rw_score: rate,
        rw_comentario: description.toLocaleLowerCase(),
        rw_idPost: postItem.id,
        rw_idTrabajo: trabajo
      }
      setIsPosting(true)
      if (updateValoration) {
        await post("/api/review/update", review)
      } else {
        await post("/api/review/create", review)
      }
      setIsUpdatingServices && setIsUpdatingServices(prev => !prev)
      // console.log("resReview: ", res)
      setIsPosting(false)
      setTimeout(() => {
        onClose()
      }, 200)
    }
  }

  const ratingChange = newRating => {
    setRate(newRating)
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
              Valorar servicio
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
              <FormControl mb="2" isInvalid={!!errors.rate}>
                <FormLabel>Puntuación</FormLabel>
                <ReactStars
                  count={5}
                  onChange={ratingChange}
                  size={50}
                  activeColor="#ffd700"
                />
                <FormErrorMessage>{errors.rate}</FormErrorMessage>
              </FormControl>
              <FormControl mb="2" isInvalid={!!errors.description}>
                <FormLabel>Comentario</FormLabel>

                <Textarea
                  placeholder="Escribe tu comentario aquí"
                  onChange={handleInputChange}
                  name="description"
                  value={description}
                  h="100"
                  maxLength={100}
                  resizable="false"
                />

                <Box
                  d="flex"
                  justifyContent="space-between"
                  color="gray"
                  fontSize="sm"
                >
                  {!errors.description && <Box w="3"></Box>}
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                  <span style={{ paddingTop: "10px" }}>
                    {description.length}/100
                  </span>
                </Box>
              </FormControl>

              <Button
                width="full"
                variant="primary"
                my={2}
                type="submit"
                isLoading={isPosting}
                className="buttonDisabledPrimary"
              >
                Registrar valoración
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
