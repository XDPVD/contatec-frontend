import styles from "../../styles/sections/Show.module.css"
import { Box, Text, Flex, Button } from "@chakra-ui/react"
import ModalDowload from "../ShowData/ModalDowload"
import React, { useContext, useEffect, useState } from "react"
import ModalSteper from "./ModalSteper"
import { DataContext } from "../../store/GlobalState"
import { get } from "../../utils/http"

function PayCard({ service, user }) {
  const [dataOtherUser, setDataOtherUser] = useState<any>(null)
  const [postData, setPostData] = useState<any>(null)
  useEffect(() => {
    if (!service) return
    const getOtherUser = async () => {
      let data
      let error
      if (service.provider === "1") {
        const { data: dataObtenida, error: errorObtenido } = await get(
          `/api/user/info/${service.msj_user_to}`
        )
        error = errorObtenido
        data = dataObtenida
      } else {
        const { data: dataObtenida, error: errorObtenido } = await get(
          `/api/user/info/${service.msj_user_from}`
        )
        error = errorObtenido
        data = dataObtenida
      }
      if (error) {
        console.log(error)
        return
      }
      console.log("other user", data)
      setDataOtherUser(data)
    }
    getOtherUser()
    const getPostData = async () => {
      if (!service.msjIdPostPropuestaId) return
      const { data, error } = await get(
        `/api/post/${service.msjIdPostPropuestaId}`
      )
      if (error) {
        console.log(error)
        return
      }
      console.log("Post data", data)
      setPostData(data)
    }
    getPostData()
  }, [service])
  if (service.provider === "1") {
    return (
      <Flex
        backgroundColor="gray.200"
        padding="4"
        marginBottom="20px"
        justifyContent="space-between"
        w="80%"
      >
        <Box>
          <Text size="md" align="start">
            Servicio: {service.msj_descripcion_prop}
          </Text>
          <Text size="md" align="start">
            Monto: S/ {service.msj_precio_prop}
          </Text>
        </Box>
        <Flex align="center" justify="space-evenly" w="180px">
          <ModalSteper service={service} />
          <ModalDowload service={service} />
        </Flex>
      </Flex>
    )
  }
  return (
    <Flex
      backgroundColor="gray.200"
      padding="4"
      marginBottom="20px"
      justifyContent="space-between"
      w="80%"
    >
      <Box>
        <Text size="md" align="start">
          Servicio: {service.msj_descripcion_prop}
        </Text>
        <Text size="md" align="start">
          Monto: S/ {service.msj_precio_prop}
        </Text>
      </Box>
      {/* Revisar renderizado condicional (es mas complejo de lo que deberia) */}
      <Flex align="center" justify="space-around" w="180px">
        {service.trb_estado === "Contratado" ? (
          <Button variant="primary">Pagar</Button>
        ) : service.trb_estado === "En proceso" ? (
          <div>
            <h1>En proceso</h1>
          </div>
        ) : (
          <div>
            <h1>Finalizado</h1>
          </div>
        )}
        <ModalSteper service={service} />
        <ModalDowload service={service} />
      </Flex>
    </Flex>
  )
}

export default function Pay() {
  const { state } = useContext(DataContext)
  const { auth, authReady } = state
  const [myServices, setMyServices] = useState<any[]>([])

  useEffect(() => {
    if (!auth?.user?.id) return
    const userData = async () => {
      const { data: total } = await get("/api/user/info")
      const { data } = total
      console.log(data)
      console.log("yo", auth.user)
      setMyServices(data)
    }
    userData()
  }, [auth?.user?.id])

  return (
    <div>
      <Text color="primary" className={styles.mainLabel}>
        Servicios
      </Text>
      <Text color="primary" align="start" fontWeight="medium" pb="4">
        Puedes revisar tu lista de pagos y sus estado aquí.
      </Text>
      <Box overflowY="scroll" h="250px">
        <Flex justify="start" direction="column">
          {myServices.map((service, index) => (
            <PayCard service={service} user={auth.user} key={index} />
          ))}
        </Flex>
      </Box>
    </div>
  )
}
