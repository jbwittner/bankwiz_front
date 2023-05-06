import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import { useLoginUser } from '@/hook/AuthHook';
import Head from 'next/head';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    props.onSubmit(data.email, data.password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch', borderRadius: '10px' },
        '& .MuiButton-root': { m: 1, width: '45ch', borderRadius: '10px' },
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
          errors.password
            ? 'Password must be at least 8 characters long'
            : ''
        }
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  );
};

const LoginPage: React.FC = () => {
  const { sendRequest: loginUser } = useLoginUser();

  const handleLoginFormSubmit = (email: string, password: string) => {
    loginUser({
      email: email,
      password: password,
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
            <LoginForm onSubmit={handleLoginFormSubmit} />
          </Box>
          <Box mt={2}>
            <Link href="/registration">Register</Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default LoginPage;
