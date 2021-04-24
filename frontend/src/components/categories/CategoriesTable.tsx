import React, { FC } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";

interface Props {
  categories: any[],
}

export const CategoriesTable: FC<Props> = (props: Props) => {
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

const CategoryRow: FC<{ category: any }> = ({ category }) => {
  return (
    <Tr>
      <Td>{category.name}</Td>
      <Td>{category.description}</Td>
      <Td>{category.createdAt?.toLocaleDateString?.()}</Td>
      <Td>{category.updatedt?.toLocaleDateString?.()}</Td>
      <Td>
        <IconButton
          aria-label="Detalhes da categoria"
          icon={<EditIcon />} size="sm" />
      </Td>
    </Tr>
  );
}
