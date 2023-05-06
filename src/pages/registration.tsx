import React, { useState } from 'react';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import { useCreateUser } from '@/hook/AuthHook';
import Head from 'next/head';
import { useRouter } from 'next/router';

/* eslint-disable */
interface RegistrationFormProps {
  onSubmit: (
    lastName: string,
    firstName: string,
    email: string,
    password: string,
  ) => void;
}
/* eslint-enable */

const LoginForm = (props: RegistrationFormProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(lastName, firstName, email, password);
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
        id="lastName"
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <TextField
        required
        id="firstName"
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
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
        Registration
      </Button>
    </Box>
  );
};

const RegistrationPage = () => {
  const { sendRequest: createUser } = useCreateUser();
  const { push } = useRouter();

  const handleLoginFormSubmit = async (
    lastName: string,
    firstName: string,
    email: string,
    password: string,
  ) => {
    await createUser({
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
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
            <LoginForm onSubmit={handleLoginFormSubmit} />
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
