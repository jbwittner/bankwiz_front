import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useGetUser } from '@/hook/UserHook';

function App() {
  const { sendRequest: getUser, data, isLoading } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <div>is Loading : {isLoading.toString()}</div>
      <Typography variant="h5" component="h1" style={{ marginTop: '16px' }}>
        Hi {data?.firstName} !
      </Typography>
    </div>
  );
}

export default App;
