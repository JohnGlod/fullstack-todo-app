import { FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { LoginData } from '../models/IUser.interface';
import { isEmailValidate } from '../utils/isEmailValidate';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../main';

export const LoginForm = observer(() => {
  const {store} = useContext(UserContext)
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<LoginData>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    if (isValid) {
      await store.login(data);
      reset();
      navigate(`/todos/${store.user.managerId ?? store.user.id}`, {replace: true})
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post">
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
