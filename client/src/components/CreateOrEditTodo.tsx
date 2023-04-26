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

import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { UserContext } from '../main';
import { todosStore } from '../store/todos';

import { STATUS_OPTIOS, PRIORITY_OPTIONS } from '../constants';
import { ITodo, TodoCreate } from '../models';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: ITodo | undefined;
  isUpdate: boolean;
}

export const CreateOrEditTodo = observer(({ isOpen, onClose, initialValue, isUpdate = false }: Props) => {
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
      if (!initialValue) {
        todosStore.addTodo({ ...data, finishDate: data.finishDate.slice(0, 16), createdBy: user.id });
      } else {
        todosStore.updateTodo({ ...initialValue, ...data });
      }
      reset();
    }
  };

  useEffect(() => {
    reset({ ...initialValue, finishDate: initialValue?.finishDate.slice(0, 16) });
  }, []);

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
                disabled={!isUpdate}
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
                disabled={!isUpdate}
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
                disabled={!isUpdate}
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
                disabled={!isUpdate}
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
              <FormLabel>Responsible</FormLabel>
              <Select
                {...register('assignee', {
                  required: 'This field is required',
                })}
                disabled={!isUpdate}
              >
                {myEmployees.length === 0 && <option>{initialValue ? initialValue.assignee : 'No employees'}</option>}
                {myEmployees.map((employee) => (
                  <option key={employee.id} value={employee.fullName}>
                    {employee.fullName}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.assignee?.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="linkedin" type="submit" w={'full'}>
              {initialValue ? 'Update' : 'Create'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
