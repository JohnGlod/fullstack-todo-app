import {
  Box,
  Text,
  Badge,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';
import { ITodo } from '../models/ITodo.interface';
import { observer } from 'mobx-react-lite';
import { isCurrentTimeMoreThan } from '../utils/isCurrentTimeMoreThan';
import { EStatus } from '../models/EStatus.enum';

export const TodoItem = observer((todo: ITodo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, priority, finishDate, assignee, status} = todo;
  const date = new Date(finishDate).toLocaleDateString();
  return (
    <Box
      my={2}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text
          fontWeight="bold"
          fontSize="xl"
          color={status === EStatus.COMPLETED ? 'green' : isCurrentTimeMoreThan(new Date(finishDate).getTime()) ? 'red' : 'gray.400'}
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
          Completion: <strong>{date}</strong>
        </Text>
        <Text mt={2}>
          Responsible: <strong>{assignee}</strong>
        </Text>
        <Badge variant="solid"  mt={2}>
          {status}
        </Badge>
      </Box>
      <Tooltip label="Edit task" placement="left">
        <IconButton icon={<EditIcon />} variant="ghost" aria-label="Edit task" onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>11</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
});
