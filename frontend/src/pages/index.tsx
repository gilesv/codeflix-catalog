import { Button, Flex, Heading, Spinner } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { MovieTable } from '../components/movie/MovieTable'
import { useQuery } from 'react-query';
import { fetchMovies } from '../queries/movie'
import { EditIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const Index = () => {
  let { isLoading, data: movies } = useQuery('movies', fetchMovies);

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Flex justifyContent="space-between">
          <Heading>Filmes</Heading>
          <Link href="/movies/new">
            <Button leftIcon={<EditIcon />} backgroundColor="primary.blue">Criar filme</Button>
          </Link>
        </Flex>
        { isLoading && <Spinner />}
        { movies && <MovieTable movies={movies} /> }
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default Index
