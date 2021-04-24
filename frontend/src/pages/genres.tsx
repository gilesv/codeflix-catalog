import React, { FC } from 'react';
import { Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { useQuery } from 'react-query';
import { fetchGenres } from '../queries/genre';
import { Genre } from '../interfaces/genre';
import { EditIcon } from '@chakra-ui/icons';

const GenresPage = () => {
  let { isLoading, data } = useQuery('genres', fetchGenres);

  if (isLoading) {
    return <span>Carregando...</span>;
  }

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Heading>Gêneros</Heading>
        <GenresTable genres={data!} />
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}
interface TableProps {
  genres: Genre[],
}

const GenresTable: FC<TableProps> = (props: TableProps) => {
  let { genres } = props;
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Criado em</Th>
          <Th>Atualizado em</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        { genres.map(genre => <GenreRow key={genre.id} genre={genre} />) }
      </Tbody>
    </Table>
  );
}

const GenreRow: FC<{ genre: Genre }> = ({ genre }) => {
  return (
    <Tr>
      <Td>{genre.name}</Td>
      <Td>{genre.createdAt?.toLocaleDateString?.()}</Td>
      <Td>{genre.updatedAt?.toLocaleDateString?.()}</Td>
      <Td>
        <IconButton
          aria-label="Detalhes do gênero"
          icon={<EditIcon />} size="sm" />
      </Td>
    </Tr>
  );
}

export default GenresPage;
