import React from "react";
import { Flex, Heading, Spinner, useDisclosure } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { useQuery } from 'react-query';
import { fetchCategories } from '../queries/category';
import CategoriesTable from "../components/category/CategoriesTable";
import CreateCategory from "../components/category/CreateCategory";

const CategoriesPage = () => {
  let { isLoading, data: categories, error } = useQuery('categories', fetchCategories);

  return (
    <Container>
      <Main mt={0} pt={20}>
        <Flex justifyContent="space-between">
          <Heading>Categorias</Heading>
          <CreateCategory isLoading={isLoading} />
        </Flex>

        { isLoading && <Spinner /> }
        { error && <span>erro!</span> }
        { categories && <CategoriesTable categories={categories} /> }
      </Main>
      <Footer>
      </Footer>
    </Container>
  );
}

export default CategoriesPage
