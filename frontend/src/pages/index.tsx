import { Heading } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { MovieTable } from '../components/movie/MovieTable'
import { useQuery } from 'react-query';
import { fetchMovies } from '../queries/movie'

const Index = () => {
  let {isLoading, data} = useQuery('movies', fetchMovies);

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Heading>Filmes</Heading>
        {
          isLoading
            ? <span>carregando...</span>
            : <MovieTable movies={data!} />
        }
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default Index
