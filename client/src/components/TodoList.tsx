import { SimpleGrid } from '@chakra-ui/react';

import { TodoItem } from './TodoItem';

import { ITodo } from '../models';

export const TodoList = ({ isAdmin, todos }: { todos: ITodo[]; isAdmin: boolean }) => {
  return (
    <SimpleGrid minChildWidth='200px' spacing='20px'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} isAdmin={isAdmin} todo={todo} />
      ))}
    </SimpleGrid>
  );
};
