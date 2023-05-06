import React, { useState } from 'react';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import { useLoginUser } from '@/hook/AuthHook';
import Head from 'next/head';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(email, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch', borderRadius: '10px' },
        '& .MuiButton-root': { m: 1, width: '35ch', borderRadius: '10px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        required
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
      <Box mt={2}>
        <Link href="#">Register</Link>
      </Box>
    </Box>
  );
};

const LoginPage = () => {
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
        </Box>
      </main>
    </>
  );
};

export default LoginPage;
