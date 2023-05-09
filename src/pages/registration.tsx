import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useCreateUser } from '@/hook/api/AuthHook';
import { PageForm } from '@/components/PageForm';
import { toast } from 'react-toastify';

interface RegistrationFormData {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();
  const { push } = useRouter();
  const { sendRequest: createUser } = useCreateUser({
    onSuccess: () => {
      toast.success('Registration successfully !');
      push('/');
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    const fistNameCapitalized =
      data.firstName.charAt(0).toUpperCase() +
      data.firstName.toLowerCase().slice(1);
    createUser({
      lastName: data.lastName.toUpperCase(),
      firstName: fistNameCapitalized,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <PageForm
        titlePage={'Bankwiz Registration'}
        titleForm={'Bankwiz'}
        linkHref={'/'}
        linkContent={'Already have an account ? Login'}
        handleSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          required
          id="lastName"
          label="Last Name"
          {...register('lastName', { required: true })}
          error={!!errors.lastName}
          helperText={errors.lastName ? 'Last Name is required' : ''}
        />
        <TextField
          required
          id="firstName"
          label="First Name"
          {...register('firstName', { required: true })}
          error={!!errors.firstName}
          helperText={errors.firstName ? 'First Name is required' : ''}
        />
        <TextField
          required
          id="email"
          label="Email"
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          error={!!errors.email}
          helperText={errors.email ? 'Email is required and must be valid' : ''}
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          {...register('password', { required: true, minLength: 8 })}
          error={!!errors.password}
          helperText={
            errors.password ? 'Password must be at least 8 characters long' : ''
          }
        />
        <Button type="submit" variant="contained">
          Registration
        </Button>
      </PageForm>
    </>
  );
};

export default RegistrationPage;
