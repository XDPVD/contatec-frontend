/* eslint-disable camelcase */
import Head from "next/head"
import Link from "next/link"
import { Box, Breadcrumb, BreadcrumbItem, Text, Button } from "@chakra-ui/react"
import ZIcon from "../../../components/Icon"
import Layout from "../../../components/Layout"
import Title from "../../../sections/Explore/CategoryId/Contact/Title"
import PhotosDescription from "../../../sections/Explore/CategoryId/Contact/PhotosDescription"
import Comentaries from "../../../sections/Explore/CategoryId/Contact/Comentaries"
import Creator from "../../../sections/Explore/CategoryId/Contact/Creator"
import Assessment from "../../../sections/Explore/CategoryId/Contact/Assessment"
import { useRouter } from "next/router"
import { toCapitalFirstLetter } from "../../../utils/toCapital"
import { DataContext } from "../../../store/GlobalState"
import { useContext } from "react"

interface PropsUserPost {
  id: number
  createdAt: string
  updatedAt: string
  us_correo: string
  us_nombre: string
  us_apellido: string
  avatar: string
}

interface PropsCategoryPost {
  id: number
  createdAt: string
  updatedAt: string
  cat_nombre: string
  cat_descripcion: string
}
interface PropsPost {
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
  pstUsuarioId: PropsUserPost
  pstCategoriaId: PropsCategoryPost
}

export default function Post({
  post,
  reviews,
  scoreReviews
}: {
  post: PropsPost
  reviews: any
  scoreReviews: any
}) {
  const router = useRouter()
  if (!post) {
    return (
      <Box
        w="100vw"
        h="100vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <ZIcon name="alert" size={35} />
        <Text fontSize="xl" color="letter" py="4">
          Este post ya no se encuentra disponible
        </Text>
        <Button
          variant="primary"
          onClick={() => {
            router.back()
          }}
        >
          Regresar
        </Button>
      </Box>
    )
  }
  const { state } = useContext(DataContext)
  const { auth, authReady } = state
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout withNav withFooter>
        {authReady ? (
          <>
            <div className="generalWrapper">
              <Breadcrumb separator={<ZIcon name="arrow-right" />} pt="10">
                <BreadcrumbItem>
                  <ZIcon
                    name="arrow-leftv2"
                    className="mr1"
                    size={11}
                    pointer
                    onClick={() => {
                      router.push("/explorar")
                    }}
                  />
                  <Link href="/explorar" as={`/explorar`}>
                    <a>Categoría</a>
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <Link
                    href="/explorar/[categoryid]"
                    as={`/explorar/${post.pstCategoriaId.id}`}
                  >
                    <a>{post.pstCategoriaId.cat_nombre}</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <Link
                    href="/explorar/[categoryid]/[categoryitemid]"
                    as={`/explorar/${post.pstCategoriaId.id}/${post.id}`}
                  >
                    <a>{toCapitalFirstLetter(post.pst_nombre)}</a>
                  </Link>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <Title
              title={post.pst_nombre}
              briefDescription={post.pst_descripcion_corta}
            />
            <PhotosDescription post={post} creator={post.pstUsuarioId} />
            <Creator
              creator={post.pstUsuarioId}
              post={post}
              token={auth.access_token}
            />
            <Assessment post={post} scoreReviews={scoreReviews} />
            <Comentaries reviews={reviews} />
          </>
        ) : (
          <Box
            d="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
            h="3xl"
          >
            {/* TODO: Agregar imagen */}
            <Text>Cargando...</Text>
          </Box>
        )}
      </Layout>
    </div>
  )
}

export const getServerSideProps = async context => {
  const id = context.params.categoryitemid
  // console.log("id: ", id)
  const res = await fetch(`${process.env.API_BASE_URL}/api/post/${id}`)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = await res.json()
  return {
    props: data
  }
}
