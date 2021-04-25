import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Switch } from '@chakra-ui/switch';
import { Textarea } from '@chakra-ui/textarea';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Movie } from '../../interfaces/movie';
import { IntoMovie } from '../../transformers/movie.transformer';

type MovieFormData = {
  title: string,
  synopsis: string,
  releaseYear: number,
  isAvailable: boolean,
  posterImage: any,
  bannerImage: any,
  videoFile: any,
}

type Props = {
  movie: Movie,
  saveMovie: (movie: Movie) => void
}

const MovieForm: FC<Props> = ({ movie, saveMovie }) => {
  const { register, handleSubmit } = useForm<MovieFormData>();
  const isNew = movie.id === "";
  const onSubmit = (data: MovieFormData) => {
    let newMovie = IntoMovie({...movie, ...data});
    saveMovie(newMovie);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired={true}>
        <FormLabel>Título</FormLabel>
        <Input type="text" defaultValue={movie.title} {...register('title')} />
      </FormControl>

      <FormControl isRequired={true}>
        <FormLabel>Sinopse</FormLabel>
        <Textarea defaultValue={movie.synopsis} {...register('synopsis')} />
      </FormControl>

      <FormControl isRequired={true}>
        <FormLabel>Ano de lançamento</FormLabel>
        <Input type="number" defaultValue={movie.releaseYear!} {...register('releaseYear')} />
      </FormControl>

      <FormControl>
        <FormLabel>Disponível</FormLabel>
        <Switch defaultChecked={movie.isAvailable} {...register('isAvailable')} />
      </FormControl>

      <Button mt={18} type="submit">{isNew ? "Criar" : "Atualizar"}</Button>
    </form>
  );
}

const MovieUploadsForm = () => {
  return (null);
}

export default MovieForm;
