import { Heading } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQueryClient } from 'react-query';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Main } from '../../components/Main';
import MovieForm from '../../components/movie/MovieForm';
import { Movie } from '../../interfaces/movie';
import { createMovie } from '../../queries/movie';
import { IntoMovie } from '../../transformers/movie.transformer';

const NewMovie = () => {
  const toast = useToast();
  const router = useRouter();

  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(createMovie, {
    onSuccess: (data) => {
      let movie = IntoMovie(data);
      queryClient.setQueryData(['movie', { id: movie.id }], movie),
      toast({
        title: `"${movie.title}" criado com sucesso`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/movies/${movie.id}`);
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

  let blank: Movie = {
    id: "",
    title: "",
    synopsis: "",
    releaseYear: 2021,
    isAvailable: false,
    isActive: true,
    createdAt: null,
    updatedAt: null,
    categories: [],
    genres: [],
    castMembers: [],
  };

  let saveMovie = (movie: Movie) => {
    mutation.mutate(movie);
  };

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Heading>Novo filme</Heading>
        <MovieForm movie={blank} saveMovie={saveMovie} />
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default NewMovie;