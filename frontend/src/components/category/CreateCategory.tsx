import { FC } from 'react';
import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast, 
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { IntoCategory } from '../../transformers/category.transformer';
import { useMutation, useQueryClient } from 'react-query';
import { createCategory } from '../../queries/category';

interface Props {
  isLoading: boolean
}

interface CategoryFormData {
  name: string,
  description: string,
}

const CreateCategory: FC<Props> = ({ isLoading }) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure();
  const toast = useToast();

  const { register, handleSubmit } = useForm<CategoryFormData>();
  const queryClient = useQueryClient();
  const mutation = useMutation(createCategory, {
    onSuccess: (data) => {
      let newCategory = IntoCategory(data);
      queryClient.setQueryData(['category', { id: newCategory.id }], newCategory),
      toast({
        title: `"${newCategory.name}" criado com sucesso`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onModalClose();
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
  const onSubmit = (data: CategoryFormData) => {
    let newCategory = IntoCategory(data);
    mutation.mutate(newCategory);
  };

  return (
    <>
      <Button
        isDisabled={isLoading}
        backgroundColor="primary.blue"
        leftIcon={<EditIcon />}
        onClick={onModalOpen}>
          Criar Categoria
      </Button>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired={true}>
                <FormLabel>Nome</FormLabel>
                <Input type="text" {...register('name')} />
              </FormControl>
              <FormControl isRequired={true}>
                <FormLabel>Descrição</FormLabel>
                <Input type="text" {...register('description')} />
              </FormControl>

              <Button
                mt={18}
                backgroundColor="primary.blue"
                isDisabled={mutation.isLoading}
                type="submit"
                colorScheme="primary.blue">
                  { mutation.isLoading ? <Spinner /> : "Criar" }
              </Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCategory;
