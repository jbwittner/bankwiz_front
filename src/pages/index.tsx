import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLoginUser } from '@/hook/AuthHook';
import { PageForm } from '@/components/PageForm';

interface LoginFormData {
  email: string;
  password: string;
}

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { push } = useRouter();
  const { sendRequest: loginUser } = useLoginUser({
    onSuccess: () => push('/home'),
  });

  const onSubmit = (data: LoginFormData) => {
    loginUser({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
    <PageForm>
    <TextField
                  required
                  id="email"
                  label="Email"
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  error={!!errors.email}
                  helperText={
                    errors.email ? 'Email is required and must be valid' : ''
                  }
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  {...register('password', { required: true })}
                  error={!!errors.password}
                  helperText={errors.password ? 'Password is required' : ''}
                />
                <Button type="submit" variant="contained">
                  Login
                </Button>

    </PageForm>
    </>
  );
};

export default RegistrationPage;
