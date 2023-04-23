import { useDisclosure, Box, Heading, Button, Flex } from '@chakra-ui/react';

import { TodoList } from '../components/TodoList';
import { AddIcon, CopyIcon, LinkIcon } from '@chakra-ui/icons';
import { CLIENT_URL } from '../constants';
import { useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CreateTodo } from '../components/CreateTodo';
import { todosStore } from '../store/todos';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../main';

export const Todos = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { addTodo } = todosStore;
  const { store } = useContext(UserContext);
  const { isAdmin, user } = store;

  console.log(isAdmin, 'admin', user.firstName)
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${CLIENT_URL}signup/${id}`);
    setIsCopied(true);
  }, [id]);

  return (
    <Box minW="100vw" minH="100vh" bg="gray.100" p={4}>
      <Heading as="h2" size="lg" textAlign={'center'}>
        Todos
      </Heading>
      {isAdmin && (
        <Flex align={'center'} justify={'space-between'}>
          <Button leftIcon={<AddIcon />} colorScheme="pink" variant="solid" onClick={onOpen}>
            New task
          </Button>
          <Button leftIcon={isCopied ? <CopyIcon /> : <LinkIcon />} onClick={handleCopy}>
            {!isCopied ? 'Create invate' : 'Copied!'}
          </Button>
        </Flex>
      )}
      <Flex align={'center'} justify={'center'} mt={4} gap={2}>
        <Button colorScheme="linkedin" variant="outline">
          Sorted by priority
        </Button>
        <Button colorScheme="linkedin" variant="outline">
          Sorted by status
        </Button>
      </Flex>
      <CreateTodo isOpen={isOpen} onClose={onClose} addTodo={addTodo} />
      <TodoList id={id} />
    </Box>
  );
});
