import { Flex, Heading } from '@chakra-ui/react';

import { TodoList } from './TodoList';

import { ITodo } from '../models';

interface GroupedListProps {
  [key: string]: ITodo[];
}
type GroupedListType = [string, ITodo[]];

export const GroupedList = (props: GroupedListProps) => {
  return (
    <Flex flexDirection="column" mt={4}>
      {Object.entries(props).map(([key, todos]: GroupedListType) => (
        <Flex key={key} flexDirection="column" mt={4}>
          <Heading as="h4" size="md" textAlign={'center'} >
            {key === 'today' ? 'For today:' : key === 'week' ? 'For a week:' : key === 'more' ? 'For the future:' : key}
          </Heading>
          <TodoList todos={todos} isAdmin={false} />
        </Flex>
      ))}
    </Flex>
  );
};
