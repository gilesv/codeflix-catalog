import { Heading, Text } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container height="100vh">
    <Main mt={0} pt={20}>
      <Heading> Filmes </Heading>
    </Main>

    <Footer>
    </Footer>
  </Container>
)

export default Index
