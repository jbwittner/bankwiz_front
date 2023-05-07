import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

type PageFormProps = {
  titlePage: string;
  titleForm: string;
  linkHref: string;
  linkContent: string;
  handleSubmit: () => {};
  children: React.ReactNode;
};

const PageForm = (props: PageFormProps) => {
  return (
    <>
      <Head>
        <title>{props.titlePage}</title>
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
            {props.titleForm}
          </Typography>
          <Box sx={{ width: '400px', height: 'auto', mt: 4 }}>
            <form onSubmit={props.handleSubmit}>
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
                {props.children}
              </Box>
            </form>
          </Box>
          <Box mt={2}>
            <Link href={props.linkHref}>{props.linkContent}</Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export { PageForm };
