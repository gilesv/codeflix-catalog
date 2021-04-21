import React, { FC } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

interface Props {
  movies: any[],
}

export const MovieTable: FC<Props> = (props: Props) => {
  let { movies } = props;
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Título</Th>
          <Th>Criado em</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        { movies.map(movie => <MovieRow key={movie.id} movie={movie} />) }
      </Tbody>
    </Table>
  );
}

const MovieRow: FC<{ movie: any}> = ({ movie }) => {
  return (
    <Tr>
      <Td>{movie.title}</Td>
      <Td>{movie.createdAt?.toLocaleDateString?.()}</Td>
      <Td><Badge>{movie.isAvailable ? "Liberado" : "Oculto"}</Badge></Td>
      <Td>
        <IconButton
          aria-label="Detalhes do filme"
          icon={<SearchIcon />} size="sm" />
      </Td>
    </Tr>
  );
}
