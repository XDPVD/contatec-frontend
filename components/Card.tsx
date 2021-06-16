import { Box, Image, Text, Flex } from "@chakra-ui/react"
import styles from "../styles/sections/Home.module.css"
export default function Card() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} h="sm" />

      <Box p="5">
        <Flex align="center" justify="center" direction="column">
          <Flex align="center" justify="center">
            <Text fontSize="md" className={styles.bold500}>
              Marketing contenido
            </Text>
          </Flex>
          <Flex align="center" justify="center">
            <Text fontSize="md" className={styles.bold200} color="gray">
              Desde S/.300
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}