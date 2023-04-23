import { Grid } from '@chakra-ui/react';
import { TodoItem } from './TodoItem';
import { observer } from 'mobx-react-lite';

import { todosStore } from '../store/todos';
import { useContext, useEffect } from 'react';
import { UserContext } from '../main';

export const TodoList = observer(({ id }: { id?: string }) => {
  const { todos} = todosStore;
  const { store } = useContext(UserContext);

  const { isAdmin } = store;

  useEffect(() => {
    const path = isAdmin ? `todos/manager/${id}` : `todos/employee/${id}`;
    todosStore.getTodos(path)
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </Grid>
  );
});
