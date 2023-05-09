import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useGetUser } from '@/hook/api/UserHook';

function App() {
  const { sendRequest: getUser, data } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h5" component="h1" style={{ marginTop: '16px' }}>
        Hi {data?.firstName} !
      </Typography>
    </div>
  );
}

export default App;
