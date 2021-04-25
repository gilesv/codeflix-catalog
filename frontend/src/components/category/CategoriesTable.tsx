import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Category } from '../../interfaces/category';
import { FC } from "react";

interface TableProps {
  categories: Category[],
}

const CategoriesTable: FC<TableProps> = ({ categories }) => {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          <Th>Criado em</Th>
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
    </Tr>
  );
}

export default CategoriesTable;
