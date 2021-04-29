import { Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Main } from '../../components/Main';
import MovieForm from '../../components/movie/MovieForm';
import { MovieUploads } from '../../components/movie/MovieUploads';
import { Movie } from '../../interfaces/movie';
import { fetchMovie, updateMovie } from '../../queries/movie';
import { IntoMovie } from '../../transformers/movie.transformer';

const MovieDetails = () => {
  // get movie
  const router = useRouter();
  const { id } = router.query;
  let { isLoading, data: movie, error } = useQuery(['movie', id], () => fetchMovie(id as string));

  // toast
  const toast = useToast();

  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(updateMovie, {
    onSuccess: (data) => {
      let movie = IntoMovie(data);
      queryClient.setQueryData(['movie', { id: movie.id }], movie),
      toast({
        title: `"${movie.title}" atualizado com sucesso`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  });

  let saveMovie = (movie: Movie) => {
    mutation.mutate(movie);
  };

  return (
    <Container>
      <Main mt={0} pt={20}>
        { isLoading && <Spinner />}
        { error && <Heading>Filme não encontrado</Heading> }
        {
          movie && <>
            <Heading>{movie.title}</Heading>
            <Tabs>
              <TabList>
                <Tab>Detalhes</Tab>
                <Tab>Arquivos</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieForm movie={movie} saveMovie={saveMovie} />
                </TabPanel>
                <TabPanel>
                  <MovieUploads movie={movie} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        }
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default MovieDetails;
