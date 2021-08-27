import { Box, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react"

export default function Statistics() {
  return (
    <Box
      border="2px solid gray.800"
      alignItems="center"
      d="flex"
      justifyContent="center"
      p="5"
      boxShadow="xl"
      mb="15"
    >
      <StatGroup w="800px">
        <Stat>
          <StatNumber textAlign="center">05</StatNumber>
          <StatLabel textAlign="center">Servicios publicados</StatLabel>
        </Stat>

        <Stat>
          <StatNumber textAlign="center">4.50/5</StatNumber>
          <StatLabel textAlign="center">Valoración promedio</StatLabel>
        </Stat>

        <Stat>
          <StatNumber textAlign="center">20</StatNumber>
          <StatLabel textAlign="center">Total de reseñas</StatLabel>
        </Stat>
      </StatGroup>
    </Box>
  )
}
