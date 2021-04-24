import React, { FC } from "react";
import { Heading } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { useQuery } from 'react-query';
import { fetchCategories } from '../queries/category';
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { Category } from '../interfaces/category';

const CategoriesPage = () => {
  let { isLoading, data } = useQuery('categories', fetchCategories);

  if (isLoading) {
    return <span>Carregando...</span>;
  }

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Heading>Categorias</Heading>
        <CategoriesTable categories={data!} />
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

interface TableProps {
  categories: Category[],
}

const CategoriesTable: FC<TableProps> = (props: TableProps) => {
  let { categories } = props;
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          <Th>Criado em</Th>
          <Th>Atualizado em</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        { categories.map(category => <CategoryRow key={category.id} category={category} />) }
      </Tbody>
    </Table>
  );
}

const CategoryRow: FC<{ category: Category }> = ({ category }) => {
  return (
    <Tr>
      <Td>{category.name}</Td>
      <Td>{category.description}</Td>
      <Td>{category.createdAt?.toLocaleDateString?.()}</Td>
      <Td>{category.updatedAt?.toLocaleDateString?.()}</Td>
      <Td>
        <IconButton
          aria-label="Detalhes da categoria"
          icon={<EditIcon />} size="sm" />
      </Td>
    </Tr>
  );
}

export default CategoriesPage
