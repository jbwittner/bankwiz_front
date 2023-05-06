import React, { useState } from 'react';
import { TextField, Button, Box, Link, Typography } from '@mui/material';
import { useCreateUser } from '@/hook/AuthHook';
import Head from 'next/head';
import SimpleTextField from '@/component/TextField';

interface RegistrationFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(firstName, lastName, email, password);
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
      <SimpleTextField
        required
        id="firstName"
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <SimpleTextField
        required
        id="lastName"
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <SimpleTextField
        required
        id="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <SimpleTextField
        required
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </Box>
  );
};

const RegistrationPage = () => {
  const { sendRequest: registerUser } = useCreateUser();

  const handleRegistrationFormSubmit = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  };

  return (
    <>
      <Head>
        <title>Bankwizz Registration</title>
      </Head>
      <main>
        <Box
          sx={{
            height: '85vh',
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
            <RegistrationForm onSubmit={handleRegistrationFormSubmit} />
          </Box>
          <Box mt={2}>
            <Link href="/">Already have an account? Login</Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default RegistrationPage;
