import {
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  ModalBody,
  ModalCloseButton,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';

import { TodoCreate, TodoDto } from '../models/ITodo.interface';
import { useForm, SubmitHandler } from 'react-hook-form';

import { STATUS_OPTIOS, PRIORITY_OPTIONS } from '../constants';
import { useContext } from 'react';
import { UserContext } from '../main';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addTodo: (todo: TodoDto) => void;
}

export const CreateTodo = ({ isOpen, onClose, addTodo }: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<TodoCreate>({
    mode: 'onBlur',
  });
  const onSubmit: SubmitHandler<TodoCreate> = (data) => {
    if (isValid) {
      addTodo({...data, createdBy: user.id });
      reset();
    }
  };
  const { store } = useContext(UserContext);

  const { myEmployees, user } = store;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <FormControl mt={4} isInvalid={!!errors?.title?.message}>
              <FormLabel>Title</FormLabel>
              <Input
                {...register('title', {
                  required: 'This field is required',
                })}
              />
              <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors?.description?.message}>
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register('description', {
                  required: 'This field is required',
                })}
                placeholder="Enter a description of the task"
                size="sm"
                resize={'vertical'}
              />
              <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors?.finishDate?.message}>
              <FormLabel>Finish Date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                {...register('finishDate', {
                  required: 'This field is required',
                })}
              />
              <FormErrorMessage>{errors?.finishDate?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors?.status?.message}>
              <FormLabel>Status</FormLabel>
              <Select
                {...register('status', {
                  required: 'This field is required',
                })}
              >
                {STATUS_OPTIOS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.status?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors?.priority?.message}>
              <FormLabel>Priority</FormLabel>
              <Select
                {...register('priority', {
                  required: 'This field is required',
                })}
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.priority?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors?.assignee?.message}>
              <FormLabel>Employee</FormLabel>
              <Select
                {...register('assignee', {
                  required: 'This field is required',
                })}
              >
                {myEmployees.length === 0 && <option disabled>No employees</option>}
                {myEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName + ' ' + employee.lastName}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.assignee?.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="linkedin" type="submit" w={'full'}>
              Create
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
