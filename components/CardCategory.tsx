/* eslint-disable camelcase */
import { Box, Text, Flex } from "@chakra-ui/react"
import ZIcon from "../components/Icon/ZIcon"

import styles from "../styles/sections/Home.module.css"
import Image from "next/image"

interface User {
  avatar: string
  createdAt: string
  id: number
  updatedAt: string
  us_apellido: string
  us_correo: string
  us_nombre: string
}

interface Post {
  id: number
  createdAt: string
  updatedAt: string
  pst_isActive: boolean
  pst_descripcion_corta: string
  pst_nombre: string
  pst_descripcion_incluye: string
  pst_descripcion: string
  pst_imagen_1: string
  pst_imagen_2: string
  pst_imagen_3: string
  pst_imagen_4: string
  pst_imagen_5: string
  pst_precioBase: number
  pstUsuarioId: User
}

interface PropsCard {
  title: string
  imageUrl: string
  post: Post
}
export default function CardCategory({ title, imageUrl, post }: PropsCard) {
  console.log(post.pstUsuarioId)
  return (
    <Box borderRadius="lg" overflow="hidden" mx="3">
      <Image
        src={post?.pst_imagen_1 || "/assets/images/marketing/marketing1.png"}
        alt={post?.pst_nombre}
        height="500"
        width="500"
      />

      <Box px="2" pb="5">
        <Flex align="flex-start" justify="center" direction="column">
          <Flex align="center" justify="space-between" w="full" p="3">
            <Flex align="center" w="40px" justify="space-between">
              <ZIcon name="star" />
              <Text fontSize="sm" className={styles.bold200} color="primary">
                4.0
              </Text>
            </Flex>
            <Text fontSize="sm" className={styles.bold200} color="primary">
              S/. {post?.pst_precioBase}
            </Text>
          </Flex>
          <Flex align="center" justify="flex-start">
            <Text fontSize="md" className={styles.bold500} color="primary">
              {post?.pst_nombre}
            </Text>
          </Flex>
          <Flex align="center" justify="flex-start">
            <Text fontSize="sm" className={styles.bold200} color="primary">
              Por {post.pstUsuarioId.us_nombre} {post.pstUsuarioId.us_apellido}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
