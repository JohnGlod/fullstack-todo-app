import React from 'react';
import { SignUpForm } from '../components/SignUpForm';
import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Registration = () => {
  return (
    <Box minW='sm'>
      <Heading  as='h2' size='lg' textAlign={'center'}> Sign Up</Heading>
      <SignUpForm />
      <Box mt={4} >
        Already have an account?
        <Link to={'/'} className="link" style={{ marginLeft: '15px' }}>
          Sign In
        </Link>
      </Box>
    </Box>
  );
};
