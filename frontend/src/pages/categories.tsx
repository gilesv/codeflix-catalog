import { Heading } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { useQuery } from 'react-query';

const CategoriesPage = () => {
  // let {isLoading, data} = useQuery('movies', fetchMovies);

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Heading>Categorias</Heading>
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default CategoriesPage
