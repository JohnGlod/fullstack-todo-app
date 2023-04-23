import { Outlet } from 'react-router-dom';
import { Container, Center} from '@chakra-ui/react';

export const Layout = () => {
  return (
    <Container>
      <Center  h={'100vh'}>
        <Outlet />
      </Center>
    </Container>
  );
};
