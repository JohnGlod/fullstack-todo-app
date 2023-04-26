import { Box, Heading} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LoginForm } from '../components';

export const Login = () => {
  return (
    <Box minW='sm'>
      <Heading  as='h2' size='lg' textAlign={'center'}>Sign In</Heading>
      <LoginForm />
      <Box mt={4}>
        Don’t have an account?{' '}
        <Link to={'/signup'} className="link">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};
