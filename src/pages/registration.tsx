import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCreateUser } from '@/hook/AuthHook';

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
  const { sendRequest: createUser } = useCreateUser();

  const onSubmit = async (data: RegistrationFormData) => {
    // Handle form submission here
    createUser({
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      password: data.password,
    });
    push('/');
  };

  return (
    <>
      <Head>
        <title>Bankwizz Registration</title>
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
                  helperText={
                    errors.email ? 'Email is required and must be valid' : ''
                  }
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
                  Registration
                </Button>
              </Box>
            </form>
          </Box>
          <Box mt={2}>
            <Link href="/">Already have an account ? Login</Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default RegistrationPage;
