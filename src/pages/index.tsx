import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLoginUser } from '@/hook/AuthHook';

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
      <Head>
        <title>Bankwizz Login</title>
      </Head>
      <main>
        <Box
          sx={{
            height: '95vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Bankwiz
          </Typography>
          <Box sx={{ width: '400px', height: 'auto', mt: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  '& .MuiTextField-root': {
                    m: 1,
                    width: '45ch',
                    borderRadius: '10px',
                  },
                  '& .MuiButton-root': {
                    m: 1,
                    width: '45ch',
                    borderRadius: '10px',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
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
              </Box>
            </form>
          </Box>
          <Box mt={2}>
            <Link href="/registration">Registration</Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default RegistrationPage;
