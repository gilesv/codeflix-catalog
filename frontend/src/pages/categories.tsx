import { Heading } from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { useQuery } from 'react-query';
import { CategoriesTable } from '../components/categories/CategoriesTable';
import { fetchCategories } from '../queries/category';

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

export default CategoriesPage
