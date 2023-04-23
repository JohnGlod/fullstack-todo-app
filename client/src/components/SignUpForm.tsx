import { FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUpData } from '../models/IUser.interface';
import { isEmailValidate } from '../utils/isEmailValidate';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../main';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const SignUpForm = observer(() => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<SignUpData>({
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { store } = useContext(UserContext);

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    if (isValid) {
      await store.signup(data, id);
      reset();
      navigate(`/todos/${store.user.managerId ?? store.user.id}`, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post">
      <FormControl mt={4} isInvalid={!!errors?.firstName?.message}>
        <FormLabel>First name</FormLabel>
        <Input
          {...register('firstName', {
            required: 'This field is required',
          })}
        />
        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors?.middleName?.message}>
        <FormLabel>Middle name</FormLabel>
        <Input
          {...register('middleName', {
            required: 'This field is required',
          })}
        />
        <FormErrorMessage>{errors?.middleName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors?.lastName?.message}>
        <FormLabel>Last name</FormLabel>
        <Input
          {...register('lastName', {
            required: 'This field is required',
          })}
        />
        <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors?.login?.message}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('login', {
            required: 'This field is required',
            validate: (value) => isEmailValidate(value),
          })}
        />
        <FormErrorMessage>{errors?.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors?.password?.message}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Must contain at least 3 letters',
            },
            maxLength: {
              value: 32,
              message: 'Must contain no more than 32 letters',
            },
          })}
          type="password"
        />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="linkedin" type="submit" w={'full'}>
        Continue
      </Button>
    </form>
  );
});
