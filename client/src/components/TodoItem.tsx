import { Box, Text, Badge, IconButton, Tooltip, useDisclosure, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { EditIcon } from '@chakra-ui/icons';

import { CreateOrEditTodo } from './CreateOrEditTodo';
import { isCurrentTimeMoreThan } from '../utils/isCurrentTimeMoreThan';

import { EStatus, ITodo } from '../models';
interface TodoItemProps {
  todo: ITodo;
  isAdmin: boolean;
}
export const TodoItem = observer(({ isAdmin = false, todo }: TodoItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, priority, finishDate, assignee, status } = todo;
  const date = new Date(finishDate);
  return (
    <Flex my={2} p={4} bg="white" borderRadius="md" boxShadow="md" alignItems="center" justifyContent="space-between">
      <Box w={'full'}>
        <Text
          fontWeight="bold"
          fontSize="xl"
          color={status === EStatus.COMPLETED ? 'green' : isCurrentTimeMoreThan(date.getTime()) ? 'red' : 'gray.400'}
        >
          {title}
        </Text>
        <Badge
          variant="solid"
          colorScheme={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}
          mt={2}
        >
          {priority}
        </Badge>
        <Text mt={2}>
          Completion: <strong>{date.toLocaleDateString()}</strong>
        </Text>
        <Text mt={2}>
          Responsible: <strong>{assignee}</strong>
        </Text>

        <Flex justifyContent="space-between" mt={2} alignItems="center">
          <Badge variant="solid" mt={2} backgroundColor={'InfoText'}>
            {status}
          </Badge>

          <Tooltip label="Edit task" placement="left">
            <IconButton icon={<EditIcon />} variant="ghost" aria-label="Edit task" onClick={onOpen} />
          </Tooltip>
        </Flex>
      </Box>

      <CreateOrEditTodo isOpen={isOpen} onClose={onClose} initialValue={todo} isUpdate={isAdmin} />
    </Flex>
  );
});
