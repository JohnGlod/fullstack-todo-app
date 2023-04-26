import { useDisclosure, Box, Heading, Button, Flex, Select } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { AddIcon, CopyIcon, LinkIcon } from '@chakra-ui/icons';
import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CreateOrEditTodo, GroupedList, TodoList } from '../components';
import { todosStore } from '../store/todos';
import { UserContext } from '../main';

import { CLIENT_URL } from '../constants';
import { EGroupBy } from '../models';

export const Todos = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { store } = useContext(UserContext);
  const { isAdmin } = store;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`${CLIENT_URL}signup/${id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  }, [id]);

  useEffect(() => {
    todosStore.getTodos(id as string);
  }, []);

  return (
    <Box minW="100vw" minH="100vh" bg="gray.100" p={4}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading as="h2" size="lg" textAlign={'center'}>
          Todos
        </Heading>
        <Button leftIcon={isCopied ? <CopyIcon /> : <LinkIcon />} onClick={handleCopy}>
          {!isCopied ? 'Create invate' : 'Copied!'}
        </Button>
      </Flex>

      <Flex justifyContent={'space-between'} alignItems={'center'} gap={4} mt={4}>
        <Select
          placeholder="Group by"
          mt={4}
          background={'Background'}
          w={'250px'}
          onChange={(e) => todosStore.setGroupBy(e.target.value)}
          value={todosStore.groupBy}
        >
          <option value={EGroupBy.NONE}>None</option>
          <option value={EGroupBy.COMPLETION_DATE}> Completion date</option>
          {isAdmin && <option value={EGroupBy.RESPONSIBLE}>Responsible</option>}
        </Select>
        
        {isAdmin && (
          <>
            <Button leftIcon={<AddIcon />} colorScheme="pink" variant="solid" onClick={onOpen}>
              New task
            </Button>

            <CreateOrEditTodo isOpen={isOpen} onClose={onClose} isUpdate={isAdmin} />
          </>
        )}
      </Flex>

      {todosStore.groupBy === EGroupBy.COMPLETION_DATE && <GroupedList {...todosStore.groupedTodosByDate} />}
      {todosStore.groupBy === EGroupBy.RESPONSIBLE && <GroupedList {...todosStore.groupedTodosByAssignee} />}
      {todosStore.groupBy === EGroupBy.NONE && <TodoList isAdmin={isAdmin} todos={todosStore.sortedTodos} />}
    </Box>
  );
});
